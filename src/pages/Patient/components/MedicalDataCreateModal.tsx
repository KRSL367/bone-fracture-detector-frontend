import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MedicalData } from "../hooks/useFetchPatient"; // Import your MedicalData interface
import { medicalDataSchema, MedicalDataSchema } from "../validations/MedicalDataSchema";
import { useCreateMedicalData } from "../hooks/useCreateMedicalData";

interface MedicalDataCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: string
}

const MedicalDataCreateModal: React.FC<MedicalDataCreateModalProps> = ({
  isOpen,
  onClose,
  patientId,
}) => {
  const { isLoading, createMedicalData } = useCreateMedicalData();
  const [isVisible, setIsVisible] = useState(isOpen);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<MedicalDataSchema>({
    resolver: zodResolver(medicalDataSchema),
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: MedicalData) => {
    console.log("Submitting form with data:", data);
    if (!patientId) {
      alert("Patient ID is required.");
      return;
    }
    try {
      // Append patientId and uploaded_at to data
      const dataWithPatient = {
        ...data,
        patient: patientId,
        uploaded_at: new Date().toISOString(), // Current date and time in ISO format
      };
  
      console.log("Data with patient and uploaded_at:", dataWithPatient);
  
      // Pass the modified data to createMedicalData
      await createMedicalData(patientId, dataWithPatient);
      onClose();
      alert("Medical data created successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Unable to create medical data.");
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
          <h3 className="text-xl font-semibold">Add Medical Data</h3>
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
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter a description"
                {...register("description")}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
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

export default MedicalDataCreateModal;
