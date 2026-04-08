const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { item_title, name, email, phone, preferred_date, experience_level, payment_choice, deposit_amount, message } = req.body;

    const from = process.env.RESEND_FROM_EMAIL || "noreply@divinginasia.com";
    const to = process.env.RESEND_BOOKING_TO_EMAIL || "bookings@divinginasia.com";

    const subject = `New Booking Inquiry: ${item_title}`;
    const text = `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Preferred Date: ${preferred_date || 'N/A'}
Experience Level: ${experience_level || 'N/A'}
Payment Choice: ${payment_choice || 'N/A'}
Deposit Amount: ${deposit_amount || 'N/A'}
Message: ${message || 'N/A'}
    `.trim();

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}