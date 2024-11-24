import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePatient } from "../hooks/useCreatePatient";
import { Patient } from "../hooks/useFetchPatient";
import { patientSchema } from "../validations/patientSchema";
import { useAuth } from "../../../components/authContext";

interface PatientCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PatientCreateModal: React.FC<PatientCreateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isLoading, createPatient } = useCreatePatient();
  const [isVisible, setIsVisible] = useState(isOpen);
  const { user } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Patient>({
    resolver: zodResolver(patientSchema),
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: Patient) => {
    try {
      await createPatient(data);
      onClose();
      alert("Patient Created"); // Replace with a toast or notification library if needed
    } catch (error) {
      {
        console.error("Error:", error);
        alert("An error occurred. Unable to create patient."); // Replace with a toast or notification library if needed
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg w-1/3 max-w-md z-10">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-xl font-semibold">Create Patient</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="space-y-4">
            <div className="form-control">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="first_name"
                placeholder="First Name"
                {...register("first_name")}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.first_name ? "border-red-500" : ""
                }`}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="last_name"
                placeholder="First Name"
                {...register("last_name")}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.last_name ? "border-red-500" : ""
                }`}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label
                htmlFor="birth_date"
                className="block text-sm font-medium text-gray-700"
              >
                Birth Date
              </label>
              <input
                type="date"
                id="birth_date"
                placeholder="Birth date"
                {...register("birth_date")}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.birth_date ? "border-red-500" : ""
                }`}
              />
              {errors.birth_date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.birth_date.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                placeholder="Patient Phone"
                {...register("phone")}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                placeholder="Patient Email"
                {...register("email")}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label
                htmlFor="hospital"
                className="block text-sm font-medium text-gray-700"
              >
                Hospital
              </label>
              <input
                id="hospital"
                defaultValue={`${user?.hospital_id}`}
                {...register("hospital")}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.hospital ? "border-red-500" : ""
                }`}
              />
              {errors.hospital && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.hospital.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientCreateModal;
