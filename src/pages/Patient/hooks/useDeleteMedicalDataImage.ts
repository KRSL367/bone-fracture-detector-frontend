import { ApiResponse, usePostData } from "../../../hooks/usePostData";

const useDeleteMedicalDataImage = async (
  patient_id: string,
  medical_id: string,
  imageIds: number[] // Array of image IDs to delete
): Promise<ApiResponse<{ deleted: number }>> => {
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
  // API endpoint for batch delete
  const url = `laboratory/hospitals/${hospital_id}/patients/${patient_id}/medical-datas/${medical_id}/medical-images/batch-delete/`;

  // Prepare payload
  const formData = new FormData();
  imageIds.forEach((id) => {
    formData.append("image_ids", String(id)); // Add each image ID as a separate form field
  });

  // Use the generic POST hook
  const response = (await usePostData(
    url,
    formData
  )) as unknown as ApiResponse<{
    deleted: number;
  }>;

  return response;
};

export { useDeleteMedicalDataImage };
