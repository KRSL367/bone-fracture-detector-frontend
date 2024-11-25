import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../hooks/useFetchPatient';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/reports/${patient.id}`, { state: { patientId: patient.id } });
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 cursor-pointer hover:shadow-lg"
      onClick={handleCardClick}
    >
      <h2 className="text-xl font-semibold text-gray-800">{`${patient.first_name} ${patient.last_name}`}</h2>
      <p className="text-gray-600">Email: {patient.email}</p>
      <p className="text-gray-600">Phone: {patient.phone}</p>
      <p className="text-gray-600">Hospital: {patient.hospital}</p>
    </div>
  );
};

export default PatientCard;
