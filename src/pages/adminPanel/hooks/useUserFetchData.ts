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
    is_superuser?:boolean;
    is_hospital_admin:boolean;
  }

const useUserFetchData = async (): Promise<ApiResponse<User>> => {
  const url = `/auth/users/`;
  const response = await useFetchData<User>(url);

  return {
    data: response.data,
    status: response.status,
    error: response.error,
  };
};

export { useUserFetchData };
