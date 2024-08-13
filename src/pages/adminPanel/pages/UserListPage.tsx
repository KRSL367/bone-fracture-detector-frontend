// pages/UserList.tsx
import React, { useEffect, useState } from 'react';
import { useUserFetchData, User } from '../hooks/useUserFetchData';
import UserCard from '../components/UserCard';
import { useNavigate } from 'react-router-dom';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();



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


  const handleCreateUser = () => {
    navigate('/register')
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <button
          type="button"
          onClick={handleCreateUser}
          className="text-black bg-[#FFFFFF] border-2 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          Create User
        </button>
      </div>
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
