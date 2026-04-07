import nodemailer from 'nodemailer';
import { applyCors, handleOptions } from './_lib/cors';

export default async function handler(req, res) {
  // Handle CORS preflight
  if (handleOptions(req, res)) return;
  applyCors(res);

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // Configure SMTP transport using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
      subject: `Contact Form Submission from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>`
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
