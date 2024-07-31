import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";

export interface ActivateUser {
    uid: string;
    token: string;
  }


export const useActivateData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ActivateUser | null>(null);

  const activateUser = async (user: ActivateUser): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response: ApiResponse<ActivateUser> = await usePostData<ActivateUser>("/auth/users/activation/", user);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    activateUser,
    data,
    isLoading,
    error,
  };
};
