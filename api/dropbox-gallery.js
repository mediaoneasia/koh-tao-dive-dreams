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

    const linkResults = await Promise.all(
      imageFiles.map(async (file) => {
        const tempLinkResponse = await fetch(DROPBOX_TEMP_LINK_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: file.id || file.path_display || file.path_lower }),
        });

        const { json: tempLinkPayload, text: tempLinkText } = await readDropboxPayload(tempLinkResponse);

        if (!tempLinkResponse.ok) {
          return {
            link: null,
            error: tempLinkPayload?.error_summary || tempLinkText || `Failed to create temporary link for ${file.name}`,
          };
        }

        return {
          link: tempLinkPayload?.link || null,
          error: tempLinkPayload?.link ? null : `Missing temporary link for ${file.name}`,
        };
      })
    );

    const links = linkResults.map((result) => result.link).filter(Boolean);

    if (!links.length && imageFiles.length) {
      const firstError = linkResults.find((result) => result.error)?.error;
      return res.status(502).json({
        error: firstError || 'Dropbox returned image files, but no temporary links could be created',
      });
    }

    return res.status(200).json(links);
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}