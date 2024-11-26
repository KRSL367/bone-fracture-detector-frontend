import { ApiResponse, usePostData } from "../../../hooks/usePostData";
import { Image } from "./useFetchPatient";

const usePostMedicalData = async (
  patient_id: string,
  medical_id: string,
  images: File[], // Array of files for batch upload
  medical_data: number,
  diagnosis_report: number
): Promise<ApiResponse<Image[]>> => {
  const userString = localStorage.getItem("user");
  let hospital_id = null;

  if (userString) {
    try {
      const user = JSON.parse(userString);
      hospital_id = user.hospital_id;
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  if (!hospital_id) {
    throw new Error("Hospital ID is not available in the user data");
  }

  const url = `laboratory/hospitals/${hospital_id}/patients/${patient_id}/medical-datas/${medical_id}/medical-images/`;

  // Prepare FormData payload
  const formData = new FormData();
  images.forEach((file) => {
    formData.append(`image`, file);
  });
  formData.append("medical_data_id", String(medical_data));

  // Use the generic POST hook
  const response = (await usePostData(url, formData)) as unknown as ApiResponse<Image[]>;
  return response;
};

export { usePostMedicalData };
