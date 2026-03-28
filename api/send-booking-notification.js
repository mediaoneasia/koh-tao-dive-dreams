import { Resend } from 'resend';

export default async function handler(req, res) {
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

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.RESEND_BOOKING_TO_EMAIL || 'contact@prodiving.asia';

    if (!resendApiKey) {
      res.status(500).json({ success: false, error: 'Resend not configured' });
      return;
    }

    const resend = new Resend(resendApiKey);

    const body = `New Booking Inquiry\n\nCourse/Dive: ${item_title}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nPreferred Date: ${preferred_date || 'N/A'}\nExperience Level: ${experience_level || 'N/A'}\nDeposit Amount: ${deposit_amount || 'N/A'}\nPayment Choice: ${payment_choice || 'N/A'}\n${paypal_link ? `PayPal Link: ${paypal_link}` : ''}\n\nMessage:\n${message || 'No message'}`;

    const { error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Booking Inquiry: ${item_title}`,
      replyTo: email || undefined,
      text: body,
    });

    if (sendError) {
      console.error('Resend send error (booking):', sendError);
      res.status(500).json({ success: false, error: sendError.message || 'Failed to send email' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-booking-notification error', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
