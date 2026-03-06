
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(204).end();
    return;
  }
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    if (req.method === 'GET') {
      return res.status(200).json({
        disabled: true,
        message: 'Affiliate click tracking has been disabled on the API.',
      });
    }

    if (req.method === 'POST') {
      return res.status(200).json({
        disabled: true,
        message: 'Affiliate click tracking has been disabled on the API and no data is being stored.',
      });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('api/affiliate-clicks error', err);
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
}