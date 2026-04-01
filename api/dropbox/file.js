// /api/dropbox/file.js
// Serves file content from Dropbox by path

const { Dropbox } = require('dropbox');

const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN_HERE';
const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });

// Express handler example
module.exports = async function serveDropboxFile(req, res) {
  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'Missing path parameter' });
  try {
    const response = await dbx.filesDownload({ path });
    const file = response.result;
    res.setHeader('Content-Disposition', `inline; filename="${file.name}"`);
    res.setHeader('Content-Type', file.content_type || 'application/octet-stream');
    res.send(file.fileBinary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
