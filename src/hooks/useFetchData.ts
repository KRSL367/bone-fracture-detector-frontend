import axios from "axios";
import apiClient from "../services/ApiClient";

export interface ApiResponse<T> {
  data: T[] | null;
  status: number | null;
  error: string | null;
  count: number | null; // Total number of items
  next: string | null; // URL for the next page
  previous: string | null; // URL for the previous page
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const useFetchData = async <T>(
  url: string,
  params: Record<string, any> = {}
): Promise<ApiResponse<T>> => {
  try {
    // Include params for additional query string support
    const response = await apiClient.get<PaginatedResponse<T>>(url, {
      params,
    });

    return {
      data: response.data.results || null,
      status: response.status,
      error: null,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        status: error.response?.status || null,
        error: error.message,
        count: null,
        next: null,
        previous: null,
      };
    } else {
      return {
        data: null,
        status: null,
        error: "An unexpected error occurred",
        count: null,
        next: null,
        previous: null,
      };
    }
  }
};

export { useFetchData };
