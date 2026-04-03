const DROPBOX_LIST_FOLDER_URL = 'https://api.dropboxapi.com/2/files/list_folder';
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
  const folder = typeof req.query.folder === 'string' ? req.query.folder.trim() : '';

  if (!accessToken) {
    return res.status(500).json({ error: 'Dropbox is not configured' });
  }

  if (!folder) {
    return res.status(400).json({ error: 'Missing folder parameter' });
  }

  try {
    const listResponse = await fetch(DROPBOX_LIST_FOLDER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: `/${folder}` }),
    });

    const { json: listPayload, text: listText } = await readDropboxPayload(listResponse);
    if (!listResponse.ok) {
      return res.status(listResponse.status).json({
        error: listPayload?.error_summary || listText || 'Dropbox API error',
      });
    }

    const imageFiles = (listPayload?.entries || []).filter(
      (entry) => entry['.tag'] === 'file' && /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(entry.name)
    );

    const links = await Promise.all(
      imageFiles.map(async (file) => {
        const tempLinkResponse = await fetch(DROPBOX_TEMP_LINK_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: file.path_lower }),
        });

        const { json: tempLinkPayload } = await readDropboxPayload(tempLinkResponse);
        return tempLinkResponse.ok ? tempLinkPayload?.link || null : null;
      })
    );

    return res.status(200).json(links.filter(Boolean));
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}