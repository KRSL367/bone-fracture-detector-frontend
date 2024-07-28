import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";

export interface User {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    hospital_name: string ;
  }


export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<User | null>(null);

  const registerUser = async (user: User): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response: ApiResponse<User> = await usePostData<User>("/auth/users/", user);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    registerUser,
    data,
    isLoading,
    error,
  };
};
