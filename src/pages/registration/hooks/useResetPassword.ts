import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";

export interface ResetPassword {
    uid: string;
    token: string;
    password: string;
    confirm_password: string;
  }


export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ResetPassword | null>(null);

  const resetPassword = async (user: ResetPassword): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response: ApiResponse<ResetPassword> = await usePostData<ResetPassword>("/auth/users/reset-password-confirm/", user);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    resetPassword,
    data,
    isLoading,
    error,
  };
};
