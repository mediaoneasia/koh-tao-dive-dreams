const DROPBOX_TEMP_LINK_URL = 'https://api.dropboxapi.com/2/files/get_temporary_link';

const readDropboxPayload = async (response) => {
  const text = await response.text();
  if (!text) return { json: null, text: '' };

  try {
    return { json: JSON.parse(text), text };
  } catch {
    return { json: null, text };
  }
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
  if (!accessToken) {
    return res.status(500).json({ error: 'Dropbox is not configured' });
  }

  const path = typeof req.query.path === 'string' ? req.query.path : '';
  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  try {
    const dropboxResponse = await fetch(DROPBOX_TEMP_LINK_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path }),
    });

    const { json: payload, text } = await readDropboxPayload(dropboxResponse);
    if (!dropboxResponse.ok || !payload?.link) {
      return res.status(dropboxResponse.ok ? 502 : dropboxResponse.status).json({
        error: payload?.error_summary || text || 'Failed to fetch Dropbox file',
      });
    }

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('Location', payload.link);
    return res.status(302).end();
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
