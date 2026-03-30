import React from 'react';

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  details: Record<string, any>;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ open, onClose, title = 'Details', details }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-2 mb-4">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span>
              <span>{String(value)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
