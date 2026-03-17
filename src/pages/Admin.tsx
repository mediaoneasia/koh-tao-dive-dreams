import React, { useState, useEffect, Fragment } from 'react';
import jsPDF from 'jspdf';
import { PageManager } from '@/components/PageManager';
import AdminEmails from '@/components/AdminEmails';
import AdminVouchers from '@/components/AdminVouchers';
import AmountTabs from '@/components/AmountTabs';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAmountsModal, setShowAmountsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (activeTab === 'bookings') {
      setLoading(true);
      fetch('https://koh-tao-dive-dreams.vercel.app/api/bookings')
        .then(res => res.json())
        .then(data => {
          setBookings(data);
          setLoading(false);
        });
    }
  }, [activeTab]);

  return (
    <>
      {/* Bookings Table */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded shadow p-2">
          <h2 className="text-base font-semibold mb-2">Bookings Management</h2>
          {loading ? (
            <div style={{ fontSize: '0.9rem' }}>Loading bookings...</div>
          ) : (
            <table className="w-full mb-2 border border-gray-200 rounded-lg" style={{ fontSize: '0.8rem', borderCollapse: 'collapse' }}>
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-1" style={{ minWidth: 50 }}>Name</th>
                  <th className="p-1" style={{ minWidth: 80 }}>Email</th>
                  <th className="p-1" style={{ minWidth: 60 }}>Phone</th>
                  <th className="p-1" style={{ minWidth: 80 }}>Course</th>
                  <th className="p-1" style={{ minWidth: 60 }}>Date</th>
                  <th className="p-1" style={{ minWidth: 60 }}>Exp</th>
                  <th className="p-1" style={{ minWidth: 60 }}>Msg</th>
                  <th className="p-1" style={{ minWidth: 70, color: '#0a0' }}>Deposit</th>
                  <th className="p-1" style={{ minWidth: 70, color: '#00a' }}>Total</th>
                  <th className="p-1" style={{ minWidth: 70, color: '#a00' }}>Due</th>
                  <th className="p-1" style={{ minWidth: 50 }}>Finance</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-1">{booking.name}</td>
                    <td className="p-1">{booking.email}</td>
                    <td className="p-1">{booking.phone}</td>
                    <td className="p-1">{booking.course_title}</td>
                    <td className="p-1">{booking.preferred_date}</td>
                    <td className="p-1">{booking.experience_level}</td>
                    <td className="p-1">{booking.message}</td>
                    <td className="p-1" style={{ color: '#0a0', fontWeight: 500 }}>{booking.deposit_amount !== undefined && booking.deposit_amount !== null ? `฿${booking.deposit_amount}` : ''}</td>
                    <td className="p-1" style={{ color: '#00a', fontWeight: 500 }}>{booking.total_amount !== undefined && booking.total_amount !== null ? `฿${booking.total_amount}` : ''}</td>
                    <td className="p-1" style={{ color: '#a00', fontWeight: 500 }}>{booking.due_amount !== undefined && booking.due_amount !== null ? `฿${booking.due_amount}` : ''}</td>
                    <td className="p-1">
                      <button
                        className="bg-yellow-600 text-white px-2 py-0.5 rounded hover:bg-yellow-700"
                        style={{ fontSize: '0.8rem', minWidth: 60 }}
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowAmountsModal(true);
                        }}
                      >View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Amounts Modal */}
      {showAmountsModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setShowAmountsModal(false)}
              aria-label="Close"
            >×</button>
            <h3 className="text-lg font-bold mb-4">Booking Amounts</h3>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Deposit:</span>
                <span style={{ color: '#0a0', fontWeight: 500 }}>{selectedBooking.deposit_amount !== undefined && selectedBooking.deposit_amount !== null ? `฿${selectedBooking.deposit_amount}` : '-'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Total:</span>
                <span style={{ color: '#00a', fontWeight: 500 }}>{selectedBooking.total_amount !== undefined && selectedBooking.total_amount !== null ? `฿${selectedBooking.total_amount}` : '-'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Due:</span>
                <span style={{ color: '#a00', fontWeight: 500 }}>{selectedBooking.due_amount !== undefined && selectedBooking.due_amount !== null ? `฿${selectedBooking.due_amount}` : '-'}</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                style={{ fontSize: '0.9rem' }}
                onClick={() => setShowAmountsModal(false)}
              >Close</button>
            </div>
          </div>
        </div>
      )}
      {/* ...other admin code... */}
    </>
  );
}

export default Admin;