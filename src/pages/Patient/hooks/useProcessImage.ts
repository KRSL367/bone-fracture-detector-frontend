import { ApiResponse, usePostData } from "../../../hooks/usePostData";
import { Image } from "./useFetchPatient";

const useProcessImage = async (
  patientId: string,
  medicalId: string,
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

  const url = `laboratory/hospitals/${hospital_id}/patients/${patientId}/medical-datas/${medicalId}/medical-images/images-for-x-ray-check/`;

  // Prepare FormData payload
  const formData = new FormData();
  formData.append("medical_id", (medicalId));
  
  // Use the generic POST hook
  const response = (await usePostData(url, formData)) as unknown as ApiResponse<Image[]>;
  return response;
};

export { useProcessImage };
