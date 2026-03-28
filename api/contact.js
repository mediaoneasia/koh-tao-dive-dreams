
import { Resend } from 'resend';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.RESEND_CONTACT_TO_EMAIL || 'contact@prodiving.asia';

    if (!resendApiKey) {
      res.status(500).json({ success: false, error: 'Resend not configured' });
      return;
    }

    const resend = new Resend(resendApiKey);

    const { error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: subject || 'Contact Form Submission',
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
    });

    if (sendError) {
      console.error('Resend send error (contact):', sendError);
      res.status(500).json({ success: false, error: sendError.message || 'Failed to send email' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
