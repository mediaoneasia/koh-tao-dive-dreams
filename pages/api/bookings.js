// API route: GET /api/bookings
// Returns all bookings from Supabase

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
const BOOKING_TABLE = 'booking_inquiries';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return res.status(500).json({ message: 'Supabase not configured' });
  }
  try {
    const { data, error } = await supabase.from(BOOKING_TABLE).select('*');
    if (error) throw new Error(error.message);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Fetch failed: ' + (e.message || e) });
  }
}
