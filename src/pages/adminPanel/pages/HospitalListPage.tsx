// pages/HospitalPage.tsx
import React, { useEffect, useState } from "react";
import { useHospitalFetchData, Hospital } from "../hooks/useHospitalFetchData";
import HospitalCard from "../components/HospitalCard";
import HospitalCreateModal from "../components/HospitalCreateModal";

const HospitalPage: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await useHospitalFetchData();
      if (response.error) {
        setError(response.error);
      } else {
        setHospitals(response.data || []);
      }
    };

    fetchHospitals();
  }, []);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Hospitals</h1>
        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="text-black bg-[#FFFFFF] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          Create Hospital
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>
      <HospitalCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
    </div>
  );
};

export default HospitalPage;
