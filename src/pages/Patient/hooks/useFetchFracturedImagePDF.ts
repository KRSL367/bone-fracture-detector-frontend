import { useState } from "react";
import apiClient from "../../../services/ApiClient";

interface GenerateReportResponse {
  pdfData: Blob | null;
  error: string | null;
}

const useGenerateFracturedReport = ( patientId: string, medicalDataId: string, diagnosisReportId: string) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<GenerateReportResponse>({ pdfData: null, error: null });
  let hospital_id = null;
  const userString = localStorage.getItem("user");


  if (userString) {
    try {
      const user = JSON.parse(userString);
      hospital_id = user.hospital_id;
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  if (!hospital_id) {
    throw new Error("Hospital ID is not available in the user data");
  }


  const generateReport = async () => {
    setLoading(true);
    setResponse({ pdfData: null, error: null });

    try {
      const { data } = await apiClient.get(`/laboratory/hospitals/${hospital_id}/patients/${patientId}/medical-datas/${medicalDataId}/diagnosis-reports/${diagnosisReportId}/generate-fractured-report/`, {
        params: { diagnosis_id: diagnosisReportId },
        responseType: "blob", // Ensures we receive the PDF file as a Blob
      });

      setResponse({ pdfData: data, error: null });
    } catch (error) {
      setResponse({ pdfData: null, error: "Failed to generate report." });
    } finally {
      setLoading(false);
    }
  };

  return { loading, response, generateReport };
};

export default useGenerateFracturedReport;
