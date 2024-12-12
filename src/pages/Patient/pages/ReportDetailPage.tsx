import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DiagnosisReport } from "../hooks/useFetchPatient";
import { useFetchReportDetail } from "../hooks/useFetchReportDetail";
import useGenerateFracturedReport from "../hooks/useFetchFracturedImagePDF";

const ReportDetailPage = () => {
  const location = useLocation();
  const {
    medicalId: medical_id,
    patientId: patient_id,
    resultId: result_id,
  } = location.state || {};

  const [reportData, setReportData] = useState<DiagnosisReport | null>(null);

  // Use the custom hook for PDF generation
  const { loading, response, generateReport } = useGenerateFracturedReport(
    patient_id,
    medical_id,
    result_id
  );

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

  // Function to trigger PDF download
  const downloadPdf = () => {
    if (response.pdfData) {
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(response.pdfData);
      link.href = url;
      link.download = "fractured_report.pdf"; // Set the name of the downloaded file
      link.click();
      window.URL.revokeObjectURL(url); // Revoke the object URL after download
    }
  };

  return (
    <div className="min-h-[calc(100vh-85px)] bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Diagnosis Report
        </h1>

        {/* Report Details */}
        {reportData ? (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            {/* Report Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Report</h2>
              {response.pdfData && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={downloadPdf}
                >
                  Download PDF
                </button>
              )}
            </div>

            {/* Report Content */}
            <p className="text-gray-600 mt-2">{reportData.report}</p>

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

            {/* PDF Generation Button */}
            {loading ? (
              <button
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                disabled
              >
                Generating PDF...
              </button>
            ) : (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={generateReport}
              >
                Generate Fractured Report PDF
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <p className="text-gray-500">Loading report data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetailPage;
