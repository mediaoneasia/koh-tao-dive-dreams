import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { tryAutoScroll } from '@/lib/scroll';
import Hero from '../components/Hero';
import DiveSites from '../components/DiveSites';
import Courses from '../components/Courses';
import Gallery from '../components/Gallery';
import About from '../components/About';
// import BookingInquiryForm from '../components/BookingInquiryForm';
import FunDiving from './FunDiving';
import CurrencyExchange from '../components/CurrencyExchange';

const Index = () => {
	const location = useLocation();

	useEffect(() => {
		// Scroll to anchor if hash is present
		if (location.hash) {
			const el = document.getElementById(location.hash.replace('#', ''));
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			window.scrollTo(0, 0);
		}
	}, [location]);

	return (
		<div className="min-h-screen bg-background">
			<Hero />
			<About />
			<CurrencyExchange />
			<DiveSites />
			<Courses />
			<FunDiving />
			<Gallery />
			<section id="contact" className="py-20 bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="form-container" style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', padding: '2rem', borderRadius: 8, boxShadow: '0 2px 8px #0001', color: '#222' }}>
						<h2 style={{ textAlign: 'center' }}>Booking / Inquiry Form</h2>
						<form action="https://api.web3forms.com/submit" method="POST">
							<input type="hidden" name="access_key" value="e4c4edf6-6e35-456a-87da-b32b961b449a" />
							<label htmlFor="name">Name</label>
							<input type="text" id="name" name="name" required />

							<label htmlFor="email">Email</label>
							<input type="email" id="email" name="email" required />

							<label htmlFor="phone">Phone</label>
							<input type="text" id="phone" name="phone" />

							<label htmlFor="course_title">Course / Package</label>
							<input type="text" id="course_title" name="course_title" />

							<label htmlFor="preferred_date">Preferred Date</label>
							<input type="date" id="preferred_date" name="preferred_date" />

							<label htmlFor="experience_level">Experience Level</label>
							<select id="experience_level" name="experience_level">
								<option value="">Select...</option>
								<option value="beginner">Beginner</option>
								<option value="intermediate">Intermediate</option>
								<option value="professional">Professional</option>
							</select>

							<label htmlFor="message">Comments / Questions</label>
							<textarea id="message" name="message" rows={4} required></textarea>

							<button type="submit" style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: '#0070ba', color: '#fff', border: 'none', borderRadius: 4, fontSize: '1rem', cursor: 'pointer' }}>Send Booking</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Index;
