import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from './_lib/auth.js';
import { buildJiraIssuePayload, createJiraIssue, isJiraConfigured } from './_lib/jira.js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
const PAGE_CONTENT_TABLE = 'page_content';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { realtime: { enabled: false } });

const cleanPageContent = (page) => {
  let content = page.content || '';
  content = content.replace(/^By .+\n/, '');
  content = content.replace(/^\d+ min\n/, '');
  content = content.replace(/^Add a reaction\s*\n/, '');
  return content.replace(/View Pricing & Schedule[\s\S]*$/i, '').trim();
};

const createPageIssue = (page) => createJiraIssue(buildJiraIssuePayload({
  summary: page.title || '[Page]',
  description: cleanPageContent(page),
  labels: ['page', 'export'],
}));

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return res.status(500).json({ message: 'Supabase not configured' });
  }

  if (!isJiraConfigured()) {
    return res.status(500).json({ message: 'Jira is not configured' });
  }

  try {
    const { data, error } = await supabase.from(PAGE_CONTENT_TABLE).select('*');
    if (error) throw new Error(error.message);
    if (!data || !data.length) throw new Error('No pages found');

    let success = 0;
    let failed = 0;

    for (const page of data) {
      try {
        await createPageIssue(page);
        success++;
      } catch {
        failed++;
      }
    }

    return res.status(200).json({ message: `Exported ${success} pages to Jira. ${failed ? `${failed} failed.` : ''}`.trim() });
  } catch (error) {
    return res.status(500).json({ message: 'Export failed: ' + (error instanceof Error ? error.message : error) });
  }
}