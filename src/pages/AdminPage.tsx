import React from 'react';
import AdminBookings from '../components/AdminBookings';

const AdminPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <AdminBookings />
    </div>
  );
};

export default AdminPage;
