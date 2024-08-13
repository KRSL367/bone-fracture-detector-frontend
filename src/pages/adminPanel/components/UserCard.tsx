import React from 'react';
import { User } from '../hooks/useUserFetchData';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">
        {user.first_name} {user.last_name}
      </p>
    </div>
  );
};

export default UserCard;
