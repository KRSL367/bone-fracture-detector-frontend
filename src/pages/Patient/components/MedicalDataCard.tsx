import React from "react";
import { useNavigate } from "react-router-dom";

export interface MedicalDataCardProps {
  description: string;
  uploadedAt: string | undefined;
  medical_id: number | undefined;
  patient_id: number | undefined;
}

const MedicalDataCard: React.FC<MedicalDataCardProps> = ({
  description,
  uploadedAt,
  medical_id,
  patient_id,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/reports/${patient_id}/data/${medical_id}`, { state: { medical_id, patient_id } });
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <h1 className="text-lg font-semibold text-gray-800">Medical ID: {medical_id}</h1>
      <h3 className="text-lg font-semibold text-gray-800">Description:</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-500 text-sm">
        Uploaded At: {uploadedAt
    ? new Date(uploadedAt).toLocaleString()
    : "N/A"}
      </p>
    </div>
  );
};

export default MedicalDataCard;
