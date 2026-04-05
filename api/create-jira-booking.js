import { requireAdmin } from './_lib/auth.js';
import { buildJiraIssuePayload, createJiraIssue, isJiraConfigured } from './_lib/jira.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;

  const { name, email, bookingDetails } = req.body || {};

  if (!name || !email || !bookingDetails) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!isJiraConfigured()) {
    return res.status(500).json({ error: 'Jira is not configured' });
  }

  try {
    const data = await createJiraIssue(buildJiraIssuePayload({
      summary: `Booking from ${name} (${email})`,
      description: `Booking Details:\n${bookingDetails}\n\nCustomer Email: ${email}`,
      labels: ['booking', 'manual-escalation'],
    }));

    return res.status(200).json({ success: true, issue: data });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal error' });
  }
}
