// pages/api/dropbox-gallery.js
import { NextApiRequest, NextApiResponse } from 'next';

const DROPBOX_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;

export default async function handler(req, res) {
  const { folder = '' } = req.query;
  if (!DROPBOX_TOKEN) {
    return res.status(500).json({ error: 'Dropbox token not set' });
  }
  try {
    const response = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DROPBOX_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: `/divinginasia_pics/${folder}`,
        recursive: false,
        include_media_info: true,
        include_deleted: false,
        include_has_explicit_shared_members: false,
        include_mounted_folders: true,
      }),
    });
    const data = await response.json();
    if (!data.entries) return res.status(200).json([]);
    // Filter for images only
    const images = data.entries.filter(e => e['.tag'] === 'file' && /\.(jpg|jpeg|png|webp|gif)$/i.test(e.name));
    // Get temporary links for each image
    const links = await Promise.all(images.map(async (img) => {
      const linkRes = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DROPBOX_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: img.path_lower }),
      });
      const linkData = await linkRes.json();
      return linkData.link;
    }));
    res.status(200).json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
