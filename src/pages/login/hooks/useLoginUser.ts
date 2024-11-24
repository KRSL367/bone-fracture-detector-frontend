import { useState } from "react";
import { ApiResponse, usePostData } from "../../../hooks/usePostData";
import { useAuth } from "../../../components/authContext";

export interface LoginUser {
  id?: number;
  username: string;
  is_hospital_admin?: boolean;
  is_superuser?: boolean;
  hospital?: string;
  password?: string;
  full_name?: string;
  hospital_id?: string;
}


export const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LoginUser | null>(null);
  const { login } = useAuth();

  const loginUser = async (user: LoginUser): Promise<void> => {

    setIsLoading(true);
    setError(null);

    const response: ApiResponse<LoginUser> = await usePostData<LoginUser>(
      "/auth/jwt/create/",
      user
    );

    if (response?.access && response?.user) {
      const { access, user } = response;
      login(access, user);
      
    }


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
