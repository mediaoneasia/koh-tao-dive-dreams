
import { useEffect, useState } from 'react';

  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/admin-users');
      const data = await res.json();
      setUsers(data || []);
    }
    fetchUsers();
  }, []);
  return (
    <>
      {users.length === 0 && <span className="text-gray-400">No users found</span>}
      {users.length > 0 && (
        <select
          className="border rounded px-2 py-1"
          value={selectedId || ''}
          onChange={e => onSelect(e.target.value)}
        >
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name || u.email}</option>
          ))}
        </select>
      )}
    </>
  );
}
