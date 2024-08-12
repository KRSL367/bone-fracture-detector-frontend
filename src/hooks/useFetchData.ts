import axios from "axios";
import apiClient from "../services/ApiClient";


export interface ApiResponse<T> {
    data: T[] | null;
    status: number | null;
    error: string | null;
  }
  
  export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }
  
  const useFetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<PaginatedResponse<T>>(url);
      return {
        data: response.data.results || null,
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
  
  export { useFetchData };
  