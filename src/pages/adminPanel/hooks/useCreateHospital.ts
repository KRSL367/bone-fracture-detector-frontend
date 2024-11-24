import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";
import { Hospital } from "./useHospitalFetchData";


export const useCreateHospital = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Hospital | null>(null);

  const createHospital = async (hospital: Hospital): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response: ApiResponse<Hospital> = await usePostData<Hospital>("/laboratory/hospitals/", hospital);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    createHospital,
    data,
    isLoading,
    error,
  };
};
