// API route: POST /api/export-bookings-to-jira
// Triggers export of all bookings to Jira as a single issue

import { syncBookingsToJira } from '../../src/integrations/jira/syncBookingsToJira';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    await syncBookingsToJira();
    res.status(200).json({ message: 'Exported bookings to Jira.' });
  } catch (e) {
    res.status(500).json({ message: 'Export failed: ' + (e.message || e) });
  }
}
