import { applyCors, handleOptions } from '../_lib/cors.js';

const AIRTABLE_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AFFILIATE_CLICKS_TABLE = process.env.AIRTABLE_AFFILIATE_CLICKS_TABLE || 'affiliate_clicks';

const TABLE_CANDIDATES = [
  AFFILIATE_CLICKS_TABLE,
  'affiliate_clicks',
  'Affiliate Clicks',
  'affiliate clicks',
  'Affiliate_Clicks',
].filter((value, index, array) => value && array.indexOf(value) === index);

const escapeFormulaValue = (value = '') => String(value).replace(/'/g, "\\'");

const airtableUrl = (table, query = '') => {
  const encodedTable = encodeURIComponent(table);
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodedTable}${query ? `?${query}` : ''}`;
};

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
};

const getHeaders = () => ({
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
});

const mapClickRecord = (record) => {
  const fields = record?.fields || {};
  return {
    id: fields.id || record.id,
    hotel_name: fields.hotel_name || '',
    hotel_url: fields.hotel_url || '',
    affiliate_id: fields.affiliate_id || null,
    clicked_at: fields.clicked_at || record.createdTime || null,
    referrer: fields.referrer || null,
    user_agent: fields.user_agent || null,
  };
};

const compactFields = (fields) =>
  Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );

const createRecordWithSchemaFallback = async (baseFields) => {
  for (const tableName of TABLE_CANDIDATES) {
    let fields = { ...baseFields };

    for (let attempt = 0; attempt < 8; attempt += 1) {
      const response = await fetch(airtableUrl(tableName), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ fields }),
      });

      const payload = await response.json().catch(() => ({}));
      if (response.ok) {
        return { ok: true, payload, status: response.status, tableName };
      }

      const message = payload?.error?.message || '';
      const unknownFieldMatch = message.match(/Unknown field name: \"([^\"]+)\"/);

      if (unknownFieldMatch?.[1] && Object.prototype.hasOwnProperty.call(fields, unknownFieldMatch[1])) {
        delete fields[unknownFieldMatch[1]];
        continue;
      }

      const tableNotFound = message.toLowerCase().includes('could not find table') || response.status === 404;
      if (tableNotFound) {
        break;
      }

      return { ok: false, payload, status: response.status, tableName };
    }
  }

  return { ok: false, payload: { error: { message: 'Could not match Airtable table schema for affiliate click insert' } }, status: 400 };
};

const fetchClicksWithTableFallback = async (queryString) => {
  let lastFailure = { status: 500, payload: { error: { message: 'Failed to fetch affiliate clicks' } } };

  for (const tableName of TABLE_CANDIDATES) {
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    export default async function handler(req, res) {
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.status(204).end();
        return;
      }
      res.setHeader('Access-Control-Allow-Origin', '*');

      try {
        if (req.method === 'GET') {
          const { affiliate_id, limit = 500 } = req.query || {};
          let query = supabase
            .from('affiliate_clicks')
            .select('*')
            .order('clicked_at', { ascending: false })
            .limit(Number(limit));
          if (affiliate_id) {
            query = query.eq('affiliate_id', affiliate_id);
          }
          const { data, error } = await query;
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          return res.status(200).json(data || []);
        }

        if (req.method === 'POST') {
          const body = req.body && typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
          if (!body.hotel_name || !body.hotel_url) {
            return res.status(400).json({ error: 'Missing required fields: hotel_name and hotel_url' });
          }
          const insertData = {
            hotel_name: body.hotel_name,
            hotel_url: body.hotel_url,
            affiliate_id: body.affiliate_id,
            referrer: body.referrer,
            user_agent: body.user_agent,
            clicked_at: body.clicked_at || new Date().toISOString(),
          };
          const { data, error } = await supabase.from('affiliate_clicks').insert([insertData]).select();
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          return res.status(201).json(data && data[0] ? data[0] : insertData);
        }

        res.setHeader('Allow', 'GET, POST');
        return res.status(405).json({ error: 'Method not allowed' });
      } catch (err) {
        console.error('api/affiliate-clicks error', err);
        return res.status(500).json({ error: err?.message || 'Internal error' });
      }
    }