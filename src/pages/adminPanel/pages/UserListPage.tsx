import React, { useEffect, useState } from 'react';
import { useUserFetchData, User } from '../hooks/useUserFetchData';
import UserCard from '../components/UserCard';
import { useNavigate } from 'react-router-dom';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalCount, setTotalCount] = useState(0); // Track total number of users
  const [hasNextPage, setHasNextPage] = useState(false); // Track if there's a next page
  const [hasPreviousPage, setHasPreviousPage] = useState(false); // Track if there's a previous page
  const usersPerPage = 10; // Set the number of users per page (adjust as needed)
  const navigate = useNavigate();

  // Fetch users data with pagination
  const fetchUsers = async (page: number) => {
    const response = await useUserFetchData(page);

    if (response.error) {
      setError(response.error);
    } else {
      setUsers(response.data || []);
      setTotalCount(response.count || 0);
      setHasNextPage(!!response.next); // Check if next page exists
      setHasPreviousPage(!!response.previous); // Check if previous page exists
    }
  };

  // Fetch users when the page changes
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleCreateUser = () => {
    navigate('/register');
  };

  const handleNextPage = () => {
    if (hasNextPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const totalPages = Math.ceil(totalCount / usersPerPage); // Correct total pages calculation

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

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={!hasPreviousPage}
          className="text-white bg-gray-700 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className="text-white bg-gray-700 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
