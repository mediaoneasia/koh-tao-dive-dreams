import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from './_lib/auth.js';
import { buildJiraIssuePayload, createJiraIssue, isJiraConfigured } from './_lib/jira.js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
const BOOKING_TABLE = 'booking_inquiries';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const createBookingIssue = (booking) => createJiraIssue(buildJiraIssuePayload({
  summary: `[Booking] ${booking.course_title} for ${booking.name}`,
  description: `Booking Details:\n\nName: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nCourse: ${booking.course_title}\nPreferred Date: ${booking.preferred_date}\nTotal: ${booking.total_amount}\nDeposit: ${booking.deposit_amount}\nTo Be Paid: ${booking.due_amount}\nStatus: ${booking.status}\nID: ${booking.id}`,
  labels: ['booking', 'export'],
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
    if (req.body && Object.keys(req.body).length) {
      const result = await createBookingIssue(req.body);
      return res.status(200).json({ message: 'Exported booking to Jira.', jira: result });
    }

    const { data, error } = await supabase.from(BOOKING_TABLE).select('*');
    if (error) throw new Error(error.message);
    if (!data || !data.length) throw new Error('No bookings found');

    let success = 0;
    let failed = 0;

    for (const booking of data) {
      try {
        await createBookingIssue(booking);
        success++;
      } catch {
        failed++;
      }
    }

    return res.status(200).json({ message: `Exported ${success} bookings to Jira. ${failed ? `${failed} failed.` : ''}`.trim() });
  } catch (error) {
    return res.status(500).json({ message: 'Export failed: ' + (error instanceof Error ? error.message : error) });
  }
}