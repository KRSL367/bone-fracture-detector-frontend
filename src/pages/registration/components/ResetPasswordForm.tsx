import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/CustomInput";
import Label from "../../../components/Label";
import { ResetPassword, useResetPassword } from "../hooks/useResetPassword";
import { useParams } from "react-router-dom";


const ResetPasswordForm: React.FC = () => {
    const {uid:uid, token:token} = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassword>();

  const { resetPassword, data, isLoading, error } = useResetPassword();
  
  const onFormSubmit = async (formData: ResetPassword) => {
    if (uid && token) {
        await resetPassword({ ...formData, uid, token });
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="password">Password</Label>
        <CustomInput
          id="password"
          placeholder="password"
          register={register("new_password", { required: "Password is required" })}
        />
        {errors.new_password && <p className="text-red-600">{errors.new_password.message}</p>}
      </div>

      <div>
        <Label htmlFor="confirm password">Confirm password</Label>
        <CustomInput
          id="confirm_password"
          placeholder="Confirm password"
          register={register("confirm_password", { required: "Confirm password is required" })}
        />
        {errors.confirm_password && <p className="text-red-600">{errors.confirm_password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
      >
        {isLoading ? "Resetting..." : "Reset password"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {data && <p className="text-green-600 mt-2">Reset password</p>}
    </form>
  );
};

export default ResetPasswordForm;
