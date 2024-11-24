// components/UserCard.tsx
import React from 'react';
import { User } from '../hooks/useUserFetchData';
import { FaShieldAlt, FaHospitalAlt } from 'react-icons/fa'; // Import icons

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center">
        {user.username}
        {user.is_superuser && (
          <FaShieldAlt className="ml-2 text-blue-500" title="Superuser" />
        )}
        {user.is_hospital_admin && (
          <FaHospitalAlt className="ml-2 text-red-500" title="Hospital Admin" />
        )}
      </h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">
        {user.first_name} {user.last_name}
      </p>
      {user.hospital ? (
        <p className="text-gray-600">Hospital: {user.hospital.name}</p>
      ) : (
        <p className="text-gray-600">No associated hospital</p>
      )}
    </div>
  );
};

export default UserCard;
