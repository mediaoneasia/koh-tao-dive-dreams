import { Resend } from 'resend';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const { 
    item_title,
    name, 
    email, 
    phone,
    preferred_date,
    experience_level,
    payment_choice,
    deposit_amount,
    message,
    // Legacy field support
    course 
  } = req.body || {};

  // Use item_title or fall back to legacy 'course' field
  const bookingTitle = item_title || course;

  if (!name || !email) {
    res.status(400).json({ success: false, error: 'Missing required fields: name and email are required' });
    return;
  }

  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured - skipping email notification');
    res.status(200).json({ 
      success: true, 
      warning: 'Email notification skipped - RESEND_API_KEY not configured',
      message: 'Booking recorded but email not sent' 
    });
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Build a detailed email body
    const emailBody = `
New Booking Inquiry

Course/Dive: ${bookingTitle || 'Not specified'}
Customer Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Preferred Date: ${preferred_date || 'Not specified'}
Experience Level: ${experience_level || 'Not specified'}
Payment Choice: ${payment_choice || 'Not specified'}
Deposit Amount: ${deposit_amount || 'N/A'}

Message:
${message || 'No additional message'}
    `.trim();

    await resend.emails.send({
      from: process.env.SMTP_FROM || 'no-reply@divinginasia.com',
      to: process.env.CONTACT_RECEIVER_EMAIL || 'bookings@divinginasia.com',
      subject: `New Booking: ${bookingTitle || 'Inquiry'} - ${name}`,
      text: emailBody,
      reply_to: email,
    });

    res.status(200).json({ success: true, message: 'Notification sent successfully' });
  } catch (err) {
    console.error('Resend email error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to send notification' });
  }
}
