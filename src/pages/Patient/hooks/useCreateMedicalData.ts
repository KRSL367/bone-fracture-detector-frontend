import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";
import { MedicalData } from "./useFetchPatient";

export const useCreateMedicalData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MedicalData | null>(null);

  const createMedicalData = async (
    patient_id: string,
    medical_data: MedicalData
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const userString = localStorage.getItem("user");
    let hospitalId = null;

    if (userString) {
      try {
        const user = JSON.parse(userString);
        hospitalId = user.hospital_id;
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    if (!hospitalId) {
      throw new Error("Hospital ID is not available in the user data");
    }

    const url = `laboratory/hospitals/${hospitalId}/patients/${patient_id}/medical-datas/`;

    try {
      const response: ApiResponse<MedicalData> = await usePostData<MedicalData>(
        url,
        medical_data
      );
      if (response.error) {
        setError(response.error);
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.error("API Request failed:", error);
      setError("An error occurred while creating medical data");
    }

    setIsLoading(false);
  };

  return {
    createMedicalData,
    data,
    isLoading,
    error,
  };
};