import React from 'react';
import { PageManager } from '@/components/PageManager';

const Admin = () => {
  return (
    <div className="min-h-screen bg-muted p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <PageManager />
    </div>
  );
};

export default Admin;