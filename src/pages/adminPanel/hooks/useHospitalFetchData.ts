import { ApiResponse, useFetchData } from "../../../hooks/useFetchData";

export interface Hospital {
    id?: string;
    name: string;
    phone: string;
  }

const useHospitalFetchData = async (): Promise<ApiResponse<Hospital>> => {
  const url = `/laboratory/hospitals/`;
  const response = await useFetchData<Hospital>(url);

  return {
    data: response.data,
    status: response.status,
    error: response.error,
  };
};

export { useHospitalFetchData };
