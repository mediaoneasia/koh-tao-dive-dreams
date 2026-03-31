import { Resend } from 'resend';

// Generic SMS sending function placeholder
async function sendSMS({ to, message }) {
	// TODO: Replace this with your SMS provider's API call
	// Example:
	// await fetch('https://api.yoursmsprovider.com/send', {
	//   method: 'POST',
	//   headers: { 'Authorization': 'Bearer YOUR_API_KEY', 'Content-Type': 'application/json' },
	//   body: JSON.stringify({ to, message })
	// });
	console.log(`SMS to ${to}: ${message}`);
}

export default async function handler(req, res) {
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


		// Resend API setup
		const resendApiKey = process.env.RESEND_API_KEY;
		const fromEmail = process.env.RESEND_FROM_EMAIL || 'bookings@prodiving.asia';
		const adminEmails = (process.env.RESEND_BOOKING_TO_EMAIL || 'contact@prodiving.asia').split(',').map(e => e.trim());
		const adminPhone = process.env.ADMIN_PHONE || '+1234567890';

		if (!resendApiKey) {
			res.status(500).json({ error: 'Resend not configured' });
			return;
		}

		const resend = new Resend(resendApiKey);

		const body = `New Booking Inquiry\n\nCourse/Dive: ${item_title}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nPreferred Date: ${preferred_date || 'N/A'}\nExperience Level: ${experience_level || 'N/A'}\nDeposit Amount: ${deposit_amount || 'N/A'}\nPayment Choice: ${payment_choice || 'N/A'}\n${paypal_link ? `PayPal Link: ${paypal_link}` : ''}\n\nMessage:\n${message || 'No message'}`;

		// Send SMS notification (generic placeholder)
		await sendSMS({
			to: adminPhone,
			message: `New booking from ${name || 'N/A'} for ${item_title || 'N/A'} on ${preferred_date || 'N/A'}`
		});

		// Send email via Resend
		const { error: adminSendError } = await resend.emails.send({
			from: fromEmail,
			to: adminEmails,
			subject: `New Booking Inquiry: ${item_title}`,
			text: body,
		});
		if (adminSendError) {
			console.error('Resend send error (admin booking):', adminSendError);
			res.status(500).json({ error: 'Failed to send booking email' });
			return;
		}

		// ...existing code for Pushover push notification...

		res.status(200).json({ success: true });
	} catch (err) {
		console.error('send-booking-notification error', err);
		res.status(500).json({ error: err.message || 'Internal error' });
	}
}
