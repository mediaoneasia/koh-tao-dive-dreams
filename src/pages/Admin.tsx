import React, { useState, useEffect } from 'react';
import { PageManager } from '@/components/PageManager';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('pages');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'bookings') {
      setLoading(true);
      fetch('https://koh-tao-dive-dreams.vercel.app/api/bookings')
        .then(res => res.json())
        .then(data => {
          console.log('Bookings API response:', data);
          setBookings(data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Bookings API error:', err);
          setLoading(false);
        });
    }
  }, [activeTab]);

  const handleNoteChange = async (id, value) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, internal_notes: value } : b));
    await supabase
      .from('bookings')
      .update({ internal_notes: value, updated_at: new Date().toISOString() })
      .eq('id', id);
  };

  return (
    <div className="min-h-screen bg-muted p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-6 flex gap-4">
        <button className={`px-4 py-2 rounded ${activeTab === 'pages' ? 'bg-blue-600 text-white' : 'bg-white'}`} onClick={() => setActiveTab('pages')}>Pages</button>
        <button className={`px-4 py-2 rounded ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-white'}`} onClick={() => setActiveTab('bookings')}>Bookings</button>
      </div>
      {activeTab === 'pages' && <PageManager />}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Bookings Management</h2>
          {loading ? (
            <div>Loading bookings...</div>
          ) : (
            <table className="w-full mb-6">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course Title</th>
                  <th>Item Type</th>
                  <th>Preferred Date</th>
                  <th>Experience Level</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.course_title}</td>
                    <td>{booking.item_type}</td>
                    <td>{booking.preferred_date}</td>
                    <td>{booking.experience_level}</td>
                    <td>{booking.message}</td>
                    <td>{booking.status}</td>
                    <td>{booking.created_at ? new Date(booking.created_at).toLocaleString() : ''}</td>
                    <td>
                      <textarea
                        value={booking.internal_notes || ''}
                        onChange={e => handleNoteChange(booking.id, e.target.value)}
                        className="border rounded p-2 w-full"
                        rows={2}
                        placeholder="Add internal notes/comments..."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;