import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/CustomInput";
import Label from "../../../components/Label";
import { ResetPasswordEmail, useResetPasswordEmail } from "../hooks/useResetPasswordEmail";


const ResetPasswordEmailForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordEmail>();

  const { resetPasswordEmail, data, isLoading, error } = useResetPasswordEmail();

  const onFormSubmit = async (formData: ResetPasswordEmail) => {
    await resetPasswordEmail({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <CustomInput
          id="email"
          placeholder="jesse.pinkman@example.com"
          register={register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Reset Password Email"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {data && <p className="text-green-600 mt-2">Resend activation link successful!</p>}
    </form>
  );
};

export default ResetPasswordEmailForm;
