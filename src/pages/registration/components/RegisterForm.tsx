import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "../validation/registerSchema";
import Label from "./Label";
import CustomInput from "./CustomInput";
import { useRegisterUser } from "../hooks/UseRegisterData";

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { registerUser, data, isLoading, error } = useRegisterUser();

  const onFormSubmit = async (formData: RegisterSchema) => {
    await registerUser({...formData});
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="firstname">First name</Label>
        <CustomInput
          id="firstname"
          placeholder="Jesse"
          register={register("first_name")}
        />
        {errors.first_name && <p className="text-red-600">{errors.first_name.message}</p>}
      </div>

      <div>
        <Label htmlFor="lastname">Last name</Label>
        <CustomInput
          id="lastname"
          placeholder="Pinkman"
          register={register("last_name")}
        />
        {errors.last_name && <p className="text-red-600">{errors.last_name.message}</p>}
      </div>

      <div>
        <Label htmlFor="username">Username</Label>
        <CustomInput
          id="username"
          placeholder="Jessepinkman123"
          register={register("username")}
        />
        {errors.username && <p className="text-red-600">{errors.username.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <CustomInput
          id="email"
          placeholder="jesse.pinkman@example.com"
          register={register("email")}
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="hospital_name">Hospital name</Label>
        <CustomInput
          id="hospital_name"
          placeholder="Hospital name"
          register={register("hospital_name")}
        />
        {errors.hospital_name && <p className="text-red-600">{errors.hospital_name?.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <CustomInput
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          register={register("password")}
        />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <CustomInput
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your password"
          register={register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex items-center">
        <input
          id="showPassword"
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <Label
          htmlFor="showPassword"
          className="ml-2 block text-sm text-gray-900"
        >
          Show Password
        </Label>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {data && <p className="text-green-600 mt-2">Registration successful!</p>}
    </form>
  );
};

export default RegisterForm;
