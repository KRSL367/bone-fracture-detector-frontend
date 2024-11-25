import axios from "axios";
import apiClient from "../services/ApiClient";

export interface ApiResponseSingle<T> {
  data: T | null;
  status: number | null;
  error: string | null;
}

const useFetchSingle = async <T>(
  url: string,
  params: Record<string, any> = {}
): Promise<ApiResponseSingle<T>> => {
  try {
    // Fetch data from the API
    const response = await apiClient.get<T>(url, { params });

    return {
      data: response.data || null,
      status: response.status,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        status: error.response?.status || null,
        error: error.message,
      };
    } else {
      return {
        data: null,
        status: null,
        error: "An unexpected error occurred",
      };
    }
  }
};

export { useFetchSingle };
