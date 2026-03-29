// API route: GET /api/bookings
// Returns all bookings from Supabase

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
const BOOKING_TABLE = 'booking_inquiries';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);



export default async function handler(req, res) {
  if (req.method === 'GET') {
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
    return;
  }


  if (req.method === 'POST') {
    // Handle new booking or status update
    const { id, status, ...bookingFields } = req.body || {};
    // SMTP removed: Only Web3Forms notification will be sent
    const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY;

    // If id and status, it's a status update
    if (id && status) {
      try {
        // Update status in Supabase
        const { data, error } = await supabase
          .from(BOOKING_TABLE)
          .update({ status })
          .eq('id', id)
          .select();
        if (error) throw new Error(error.message);
        res.status(200).json({ status: 'ok', updated: data[0] });
      } catch (err) {
        res.status(500).json({ error: err.message || 'Internal error' });
      }
      return;
    }

    // Otherwise, treat as new booking
    try {
      // Insert new booking in Supabase
      const { data, error } = await supabase
        .from(BOOKING_TABLE)
        .insert([{ ...bookingFields }])
        .select();
      if (error) throw new Error(error.message);
      const booking = (data && data[0]) || {};
      const body = `New booking received\n\nName: ${booking.name || ''}\nEmail: ${booking.email || ''}\nCourse: ${booking.course_title || ''}\nPreferred Date: ${booking.preferred_date || ''}`;
      // SMTP removed: Only Web3Forms notification will be sent
      // Send notification via Web3Forms
      if (WEB3FORMS_KEY) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New Booking: ${booking.course_title || ''}`,
            from_name: booking.name || '',
            email: booking.email || '',
            message: body,
            preferred_date: booking.preferred_date || '',
            course_title: booking.course_title || '',
            admin_email: 'contact@prodiving.asia',
            // Add any other fields as needed
          }),
        });
      }
      res.status(200).json({ status: 'ok', created: data[0] });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
    return;
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
