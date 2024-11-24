import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";
import { Patient } from "./useFetchPatient";


export const useCreatePatient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Patient | null>(null);

  const createPatient = async (patient: Patient): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const userString = localStorage.getItem("user");
  
    let hospitalId = null;
  
    if (userString) {
      try {
        const user = JSON.parse(userString); // Parse the user string into an object
        hospitalId = user.hospital_id; // Access the hospital_id
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  
    if (!hospitalId) {
      throw new Error("Hospital ID is not available in the user data");
    }
  
    const url = `laboratory/hospitals/${hospitalId}/patients/`;
  

    const response: ApiResponse<Patient> = await usePostData<Patient>(`${url}`, patient);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    createPatient,
    data,
    isLoading,
    error,
  };
};
