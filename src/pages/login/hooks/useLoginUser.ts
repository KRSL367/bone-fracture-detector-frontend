import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";

export interface LoginUser {
    username: string;
    password: string;
  }


export const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LoginUser | null>(null);

  const loginUser = async (user: LoginUser): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response: ApiResponse<LoginUser> = await usePostData<LoginUser>("/auth/jwt/create/", user);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    loginUser,
    data,
    isLoading,
    error,
  };
};
