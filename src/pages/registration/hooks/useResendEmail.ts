import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";

export interface ResendEmailUser {
    email: string;
  }


export const useResendEmail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ResendEmailUser | null>(null);

  const resendEmail = async (user: ResendEmailUser): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response: ApiResponse<ResendEmailUser> = await usePostData<ResendEmailUser>("/auth/users/resend_activation/", user);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    resendEmail,
    data,
    isLoading,
    error,
  };
};
