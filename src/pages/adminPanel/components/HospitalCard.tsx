// components/HospitalCard.tsx
import React from 'react';
import { Hospital } from '../hooks/useHospitalFetchData';

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{hospital.name}</h2>
      <p className="text-gray-600">Phone: {hospital.phone}</p>
    </div>
  );
};

export default HospitalCard;
