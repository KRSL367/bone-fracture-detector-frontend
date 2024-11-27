import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MedicalDataCard from "../components/MedicalDataCard";
import { Patient } from "../hooks/useFetchPatient";
import { useFetchPatientDetail } from "../hooks/useFetchPatientDetail";
import MedicalDataCreateModal from "../components/MedicalDataCreateModal";

const PatientDetailPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);



  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId) {
        setError("Invalid patient ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await useFetchPatientDetail(patientId);

        if (response && response.data) {
          setPatient(response.data);
        } else {
          setError("Patient data is not available");
        }
      } catch (err: any) {
        console.error("Error fetching patient details:", err);
        setError(err.message || "Failed to fetch patient details");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!patient) {
    return <div>No patient data found.</div>;
  }

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Top Section: Patient Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">
          {patient.first_name} {patient.last_name}
        </h1>
        <p className="text-gray-600">Email: {patient.email}</p>
        <p className="text-gray-600">Phone: {patient.phone}</p>
        <p className="text-gray-600">
          Birth Date: {new Date(patient.birth_date).toLocaleDateString()}
        </p>
        <p className="text-gray-600">Hospital ID: {patient.hospital}</p>
      </div>

      {/* Medical Data Section */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Medical Data
          </h2>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="text-black bg-[#FFFFFF] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            Create Medical Data
          </button>
        </div>
        <MedicalDataCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        patientId={patientId}
      />

        {patient.medical_datas ? (
          <div className="space-y-4">
            {patient.medical_datas.map((medicalData) => (
              <MedicalDataCard
                key={medicalData.id}
                description={medicalData.description}
                uploadedAt={medicalData.uploaded_at}
                medical_id={medicalData.id}
                patient_id={patient.id}
              />
            ))}
          </div>
        ) : (
          <text>Error in Medical Data</text>
        )}
      </div>
      
    </div>
  );
};

export default PatientDetailPage;
