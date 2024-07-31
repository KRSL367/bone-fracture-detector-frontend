import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../validations/loginSchema";
import Label from "../../../components/Label";
import CustomInput from "../../../components/CustomInput";
import { useLoginUser } from "../hooks/useLoginUser";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { loginUser, isLoading, error } = useLoginUser();

  const onFormSubmit = async (formData: LoginSchema) => {
    await loginUser({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <CustomInput
          id="username"
          placeholder="Jessepinkman123"
          register={register("username")}
        />
        {errors.username && (
          <p className="text-red-600">{errors.username.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <CustomInput
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          register={register("password")}
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div className="flex items-center">
        <input
          id="showPassword"
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <div className="flex justify-between  w-full"  > 
          <Label
            htmlFor="showPassword"
            className="ml-2 block text-sm text-gray-900"
          >
            Show Password
          </Label>

          <Link to="/reset-password" className="text-indigo-600">
            Forgot password?
          </Link>
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}{" "}
    </form>
  );
};

export default RegisterForm;
