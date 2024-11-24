import { ApiResponse, useFetchData } from "../../../hooks/useFetchData";

export interface Hospital {
  id?: string;
  name: string;
  phone: string;
}

const useHospitalFetchData = async (
  page: number = 1, // Default to the first page
  additionalParams: Record<string, any> = {} // Allow custom query parameters
): Promise<ApiResponse<Hospital>> => {
  const url = `/laboratory/hospitals/`;
  
  // Merge pagination and additional query parameters
  const params = { page, ...additionalParams };

  const response = await useFetchData<Hospital>(url, params);

  return response;
};

export { useHospitalFetchData };
