// components/HospitalCard.tsx
import React from 'react';
import { Patient } from '../hooks/useFetchPatient';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{`${patient.first_name} ${patient.last_name}`}</h2>
      <p className="text-gray-600">Email: {patient.email}</p>
      <p className="text-gray-600">Phone: {patient.phone}</p>
      <p className="text-gray-600">Hospital: {patient.hospital}</p>

    </div>
  );
};

export default PatientCard;
