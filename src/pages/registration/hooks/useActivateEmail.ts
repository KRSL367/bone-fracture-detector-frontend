import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";

export interface ActivateEmailUser {
    email: string;
  }


export const useActivateEmail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ActivateEmailUser | null>(null);

  const activateEmail = async (user: ActivateEmailUser): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response: ApiResponse<ActivateEmailUser> = await usePostData<ActivateEmailUser>("/auth/users/activation/", user);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    activateEmail,
    data,
    isLoading,
    error,
  };
};
