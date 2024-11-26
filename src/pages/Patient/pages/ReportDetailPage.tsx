import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DiagnosisReport } from "../hooks/useFetchPatient";
import { useFetchReportDetail } from "../hooks/useFetchReportDetail";

const ReportDetailPage = () => {
  const location = useLocation();
  const {
    medicalId: medical_id,
    patientId: patient_id,
    resultId: result_id,
  } = location.state || {};
  const [reportData, setReportData] = useState<DiagnosisReport | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (patient_id && medical_id && result_id) {
        try {
          const response = await useFetchReportDetail(
            patient_id,
            medical_id,
            result_id
          );
          setReportData(response.data);
        } catch (error) {
          console.error("Error fetching medical data:", error);
        }
      } else {
        console.error("Patient ID or Medical ID is missing.");
      }
    };

    fetchReportData();
  }, [medical_id, patient_id, result_id]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title Section */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Diagnosis Report
      </h1>

      {/* Report Details */}
      {reportData ? (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Report</h2>
            <p className="text-gray-600 mt-2">{reportData.report}</p>
          </div>

          {/* Report Creation Date */}
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Created At: {new Date(reportData.created_at).toLocaleString()}
            </p>
          </div>

          {/* Diagnosis Images Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Diagnosis Images
            </h3>
            {reportData.diagnosis_images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportData.diagnosis_images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.image}
                      alt={`Diagnosis Image ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-300 transform group-hover:scale-105"
                    />
                    {/* Hover Effect: Image Details */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                      <p className="text-white text-lg font-semibold">
                        Diagnosis Image {index + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No diagnosis images available.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <p className="text-gray-500">Loading report data...</p>
        </div>
      )}
    </div>
  );
};

export default ReportDetailPage;
