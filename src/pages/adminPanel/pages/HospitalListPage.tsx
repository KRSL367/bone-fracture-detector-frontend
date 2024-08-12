// pages/HospitalPage.tsx
import React, { useEffect, useState } from 'react';
import { useHospitalFetchData, Hospital } from '../hooks/useHospitalFetchData';
import HospitalCard from '../components/HospitalCard';

const HospitalPage: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Hospitals</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map(hospital => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
};

export default HospitalPage;
