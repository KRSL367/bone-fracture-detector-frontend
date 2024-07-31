import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/CustomInput";
import Label from "../../../components/Label";
import { ResendEmailUser, useResendEmail } from "../hooks/useResendEmail";


const ResendEmailForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendEmailUser>();

  const { resendEmail, data, isLoading, error } = useResendEmail();

  const onFormSubmit = async (formData: ResendEmailUser) => {
    await resendEmail({ ...formData });
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
        {isLoading ? "Resending..." : "Resend activation link"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {data && <p className="text-green-600 mt-2">Resend activation link successfully!</p>}
    </form>
  );
};

export default ResendEmailForm;
