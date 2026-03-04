import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

// Do not call emailjs.init with the service ID — we'll pass the public key on send.

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'Course Information',
    message: ''
  });
  const [ipfsHash, setIpfsHash] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        access_key: '4ca93aa5-cd42-4902-af87-a08e1ae7c832',
        to: 'contact@prodiving.asia',
        subject: formData.subject || 'Contact Form Submission',
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: formData.message
      };
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: 'Course Information',
          message: ''
        });
      } else {
        const errMsg = data?.error || `HTTP ${response.status}`;
        console.error('Web3Forms error:', errMsg, data);
        toast.error(`Send failed: ${errMsg}. Please try again.`);
      }
    } catch (error) {
      console.error('Contact form submission failed:', error);
      toast.error(`Send failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Ready to explore the underwater world? Contact Bas to book your diving adventure on Koh Tao.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Details</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-gray-300">
                    Sairee Beach, Koh Tao<br />
                    Surat Thani 84360, Thailand
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-gray-300">+66 77 456 789</p>
                  <p className="text-gray-300">+66 89 123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-300">contact@divinginasia.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Opening Hours</h4>
                  <p className="text-gray-300">Daily: 07:00 - 19:00</p>
                  <p className="text-gray-300">Emergency: 24/7</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61553713498498" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/pro_diving_asia/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://wa.me/66612345678" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp" className="text-green-400 hover:text-green-300 transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <select name="subject" value={formData.subject} onChange={handleInputChange} title="Subject" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                  <option>Course Information</option>
                  <option>Dive Trip Booking</option>
                  <option>Equipment Rental</option>
                  <option>General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" placeholder="Tell us about your diving experience and what you're looking for..."></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-semibold">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2026 Pro Diving Asia. All rights reserved. Powered by One Media Asia @ www.onemedia.asia</p>
          <p className="mt-2">Discover the magic beneath the waves in Thailand's diving paradise.</p>
        </div>
      </div>
    </section>;
};
export default Contact;