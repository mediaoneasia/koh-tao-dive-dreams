

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

    // Web3Forms logic removed. Deprecated endpoint.
    res.status(410).json({ error: 'Web3Forms notification is deprecated. Use backend SMTP endpoint.' });
  } catch (err) {
    console.error('send-booking-notification error', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
