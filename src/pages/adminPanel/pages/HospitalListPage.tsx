import React, { useEffect, useState } from "react";
import { useHospitalFetchData, Hospital } from "../hooks/useHospitalFetchData";
import HospitalCard from "../components/HospitalCard";
import HospitalCreateModal from "../components/HospitalCreateModal";
import { useAuth } from "../../../components/authContext";

const HospitalPage: React.FC = () => {
  const { user } = useAuth();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const [totalCount, setTotalCount] = useState(0); // Total count of hospitals
  const [hasNextPage, setHasNextPage] = useState(false); // If there's a next page
  const [hasPreviousPage, setHasPreviousPage] = useState(false); // If there's a previous page

  const fetchHospitals = async (page: number) => {
    const response = await useHospitalFetchData(page);

    if (response.error) {
      setError(response.error);
    } else {
      setHospitals(response.data || []);
      setTotalCount(response.count || 0);
      setHasNextPage(!!response.next); // Convert to boolean
      setHasPreviousPage(!!response.previous); // Convert to boolean
    }
  };

  useEffect(() => {
    fetchHospitals(currentPage);
  }, [currentPage]); // Re-fetch data when the page changes

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleNextPage = () => {
    if (hasNextPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-[calc(100vh-85px)] bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto p-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold mb-6">Hospitals</h1>
          {user?.is_superuser && (
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="text-black bg-[#FFFFFF] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              Create Hospital
            </button>
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={!hasPreviousPage}
            className="text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {Math.ceil(totalCount / hospitals.length)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className="text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
        <HospitalCreateModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
        />
      </div>
    </div>
  );
};

export default HospitalPage;
