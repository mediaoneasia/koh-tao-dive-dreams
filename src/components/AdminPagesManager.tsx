import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

interface PageContentRow {
  id: string;
  language: 'en' | 'nl';
  seo: boolean;
  dive_site?: string;
  page?: string;
  section: string;
  content: string;
}

const AdminPagesManager: React.FC = () => {
  const [data, setData] = useState<PageContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('page_content')
        .select('*');
      if (error) {
        setError(error.message);
      } else {
        setData(data as PageContentRow[]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleEdit = (row: PageContentRow) => {
    setEditingId(row.id);
    setEditContent(row.content);
  };

  const handleSave = async (row: PageContentRow) => {
    const { error } = await supabase
      .from('page_content')
      .update({ content: editContent })
      .eq('id', row.id);
    if (error) {
      alert('Error saving: ' + error.message);
    } else {
      setData((prev) => prev.map((r) => (r.id === row.id ? { ...r, content: editContent } : r)));
      setEditingId(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Pages Manager</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Section</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Language</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Content</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{row.id}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{row.section}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{row.language}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>
                {editingId === row.id ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    style={{ width: '100%' }}
                  />
                ) : (
                  row.content
                )}
              </td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>
                {editingId === row.id ? (
                  <>
                    <button onClick={() => handleSave(row)} style={{ marginRight: 8 }}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(row)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPagesManager;
