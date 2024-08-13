// pages/UserList.tsx
import React, { useEffect, useState } from 'react';
import { useUserFetchData, User } from '../hooks/useUserFetchData';
import UserCard from '../components/UserCard';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await useUserFetchData();
      if (response.error) {
        setError(response.error);
      } else {
        setUsers(response.data || []);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length > 0 ? (
          users.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <p className="text-gray-500">No users available.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
