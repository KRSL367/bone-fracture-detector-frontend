import { ApiResponse, useFetchData } from "../../../hooks/useFetchData";

export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  hospital?: {
    id: string;
    name: string;
  } | null;
  is_superuser?: boolean;
  is_hospital_admin: boolean;
}

const useUserFetchData = async (
  page: number = 1, // Default to the first page
  additionalParams: Record<string, any> = {} // Allow custom query parameters
): Promise<ApiResponse<User>> => {
  const url = `/auth/users/`;

  // Merge pagination and additional query parameters
  const params = { page, ...additionalParams };

  const response = await useFetchData<User>(url, params);

  return response;
};

export { useUserFetchData };
