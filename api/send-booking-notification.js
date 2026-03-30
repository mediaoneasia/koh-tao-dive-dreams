

import { Resend } from 'resend';

export default async function handler(req, res) {
  // Allow production and any Vercel preview domain
  const origin = req.headers.origin;
  const isProd = origin === 'https://www.divinginasia.com';
  const isVercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin);
  if (isProd || isVercelPreview) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const {
      name,
      email,
      phone,
      preferred_date,
      experience_level,
      message,
      item_title,
      deposit_amount,
      payment_choice,
      paypal_link,
    } = req.body || {};

    // Basic validation
    if (!name || !email || !item_title) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    // Admins can be a comma-separated list in env
    const adminEmails = (process.env.RESEND_BOOKING_TO_EMAIL || 'admin@prodiving.asia').split(',').map(e => e.trim());

    if (!resendApiKey) {
      res.status(500).json({ success: false, error: 'Resend not configured' });
      return;
    }

    const resend = new Resend(resendApiKey);


    // Hardcoded 'Other Details' section for portability
    const otherDetails = `\nOther Details:\n- Internal Notes: ${req.body.internal_notes || '-'}\n- Bank Transfer: ${req.body.bank_transfer_details || '-'}\n- Subtotal: ${req.body.subtotal_amount || '-'}\n- Total: ${req.body.total_amount || '-'}\n- Due: ${req.body.due_amount || '-'}\n- Addons: ${req.body.addons || '-'}\n- Addons Total: ${req.body.addons_total || '-'}\n`;

    const adminSubject = `New Booking (Pending): ${item_title}`;
    const adminText = `A new booking has been submitted and is pending confirmation.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Date: ${preferred_date}\nExperience Level: ${experience_level}\nMessage: ${message}\nItem: ${item_title}\nDeposit: ${deposit_amount}\nPayment Choice: ${payment_choice}\nPaypal Link: ${paypal_link}${otherDetails}`;

    const { error: adminSendError } = await resend.emails.send({
      from: fromEmail,
      to: adminEmails,
      subject: adminSubject,
      text: adminText,
    });
    if (adminSendError) {
      console.error('Resend send error (admin booking):', adminSendError);
      res.status(500).json({ success: false, error: adminSendError.message || 'Failed to send admin email' });
      return;
    }

    // Email to client
    const clientSubject = `Booking Received: ${item_title}`;
    const clientText = `Thank you for your booking! We have received your request and will confirm your booking soon.\n\nBooking Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Date: ${preferred_date}\nExperience Level: ${experience_level}\nMessage: ${message}\nItem: ${item_title}\nDeposit: ${deposit_amount}\nPayment Choice: ${payment_choice}`;

    const { error: clientSendError } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: clientSubject,
      text: clientText,
    });
    if (clientSendError) {
      console.error('Resend send error (client booking):', clientSendError);
      res.status(500).json({ success: false, error: clientSendError.message || 'Failed to send client email' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-booking-notification error', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
