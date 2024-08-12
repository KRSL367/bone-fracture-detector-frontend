import { ApiResponse, useFetchData } from "../../../hooks/useFetchData";

export interface Hospital {
  id: string;
  name: string;
  phone: string;
}

const useHospitalFetchData = async (): Promise<ApiResponse<Hospital>> => {
  const url = `/laboratory/hospitals/`;
  return useFetchData<Hospital>(url);
};

export { useHospitalFetchData };
