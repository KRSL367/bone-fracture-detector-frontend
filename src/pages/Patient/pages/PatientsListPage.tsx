import React, { useEffect, useState } from "react";
import { Patient, useFetchPatient } from "../hooks/useFetchPatient";
import PatientCard from "../components/PatientCard";
import PatientCreateModal from "../components/PatientCreateModal";

const PatientListPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const fetchPatient = async (page: number) => {
    const response = await useFetchPatient(page);

    if (response.error) {
      setError(response.error);
    } else {
      setPatients(response.data || []);
      setTotalCount(response.count || 0);
      setHasNextPage(!!response.next); // Convert to boolean
      setHasPreviousPage(!!response.previous); // Convert to boolean
    }
  };

  useEffect(() => {
    fetchPatient(currentPage);
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
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Patients</h1>
        
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="text-black bg-[#FFFFFF] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            Create Patient
          </button>
        
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
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
          Page {currentPage} of {Math.ceil(totalCount / patients.length)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className="text-white bg-gray-700 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
      <PatientCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
    </div>
  );
};

export default PatientListPage;
