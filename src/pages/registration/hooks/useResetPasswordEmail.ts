import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";

export interface ResetPasswordEmail {
    email: string;
  }


export const useResetPasswordEmail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ResetPasswordEmail | null>(null);

  const resetPasswordEmail = async (user: ResetPasswordEmail): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response: ApiResponse<ResetPasswordEmail> = await usePostData<ResetPasswordEmail>("/auth/users/reset_password/", user);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    resetPasswordEmail,
    data,
    isLoading,
    error,
  };
};
