import AdminBookings from '../components/AdminBookings';
import AdminPagesManager from '../components/AdminPagesManager';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';




// Remove static sectionKeyList, use dynamic fetching

const Admin = () => {
    // Tab navigation UI
    // Add more admin tabs here
    const tabs = [
      { key: 'bookings', label: 'Bookings' },
      { key: 'analytics', label: 'Analytics' },
      { key: 'pages', label: 'Pages Manager' },
      { key: 'users', label: 'Users' },
    ];
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [commentDraft, setCommentDraft] = useState('');
  const [savingComment, setSavingComment] = useState(false);

  useEffect(() => {
    if (activeTab === 'bookings' || activeTab === 'comments') {
      setLoading(true);
      fetch('/api/bookings')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch bookings');
          return res.json();
        })
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          setBookings([]);
          setLoading(false);
        });
    }
  }, [activeTab]);

  // When a booking is selected in comments tab, set draft
  useEffect(() => {
    if (activeTab === 'comments' && selectedBookingId) {
      const b = bookings.find(b => b.id === selectedBookingId);
      setCommentDraft(b?.internal_notes || '');
    }
  }, [selectedBookingId, bookings, activeTab]);

  const handleSaveComment = async () => {
    if (!selectedBookingId) return;
    setSavingComment(true);
    try {
      const res = await fetch(`/api/booking_inquiries?id=${selectedBookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internal_notes: commentDraft }),
      });
      if (!res.ok) throw new Error('Failed to save comment');
      setBookings(prev => prev.map(b => b.id === selectedBookingId ? { ...b, internal_notes: commentDraft } : b));
    } catch (e) {
      alert('Error saving comment: ' + (e instanceof Error ? e.message : e));
    } finally {
      setSavingComment(false);
    }
  };


  return (
    <div className="p-4">
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded-t ${activeTab === tab.key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === 'bookings' && (
        <div className="bg-white rounded shadow p-2">
          <AdminBookings />
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded shadow p-4">Analytics dashboard coming soon...</div>
      )}
      {activeTab === 'pages' && (
        <div className="bg-white rounded shadow p-4">
          <React.Suspense fallback={<div>Loading Pages Manager...</div>}>
            <AdminPagesManager />
          </React.Suspense>
        </div>
      )}
      {activeTab === 'users' && (
        <div className="bg-white rounded shadow p-4">User management coming soon...</div>
      )}
    </div>
  );
};

export default Admin;