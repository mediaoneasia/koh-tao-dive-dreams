// Vercel Serverless Function: Basic Admin Login

const ADMIN_EMAIL = process.env.ADMIN_EMAILS || 'p@p.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ',.,.,.,.';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // In production, set a secure cookie or JWT here
    res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
}
