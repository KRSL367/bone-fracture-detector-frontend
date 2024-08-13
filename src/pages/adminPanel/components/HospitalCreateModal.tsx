import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { hospitalSchema } from "../validations/HospitalSchema";
import { useCreateHospital } from "../hooks/useCreateHospital";
import { Hospital } from "../hooks/useHospitalFetchData";

interface CreateHospitalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateHospitalModal: React.FC<CreateHospitalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isLoading, createHospital, error } = useCreateHospital();
  const [isVisible, setIsVisible] = useState(isOpen);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Hospital>({
    resolver: zodResolver(hospitalSchema),
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: Hospital) => {
    try {
      await createHospital(data);
      onClose();
      alert("Hospital Created"); // Replace with a toast or notification library if needed
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors if needed
      } else {
        console.error("Error:", error);
        alert("An error occurred. Unable to create hospital."); // Replace with a toast or notification library if needed
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
          <h3 className="text-xl font-semibold">Create Hospital</h3>
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                placeholder="Hospital Name"
                {...register("name")}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* <div className="form-control">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                placeholder="Hospital Address"
                {...register('address')}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.address ? 'border-red-500' : ''}`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div> */}

            <div className="form-control">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                placeholder="Hospital Phone"
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

            {/* <div className="form-control">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                placeholder="Hospital Email"
                {...register('email')}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div> */}
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

export default CreateHospitalModal;
