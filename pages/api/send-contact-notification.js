export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { name, email, message } = req.body || {};

        // Web3Forms logic removed. Deprecated endpoint.
        res.status(410).json({ error: 'Web3Forms notification is deprecated. Use backend SMTP endpoint.' });
    } catch (err) {
        console.error('send-contact-notification error', err);
        res.status(500).json({ error: err.message || 'Internal error' });
    }
}
