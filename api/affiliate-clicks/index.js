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