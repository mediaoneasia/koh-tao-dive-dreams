
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

