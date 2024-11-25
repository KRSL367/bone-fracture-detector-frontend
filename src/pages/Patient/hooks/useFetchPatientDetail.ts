import { ApiResponse } from "../../../hooks/usePostData";
import { useFetchSingle } from "../../../hooks/useUserFetchData";
import { Patient } from "./useFetchPatient";

const useFetchPatientDetail = async (
  patient_id: string
): Promise<ApiResponse<Patient>> => {
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

  const url = `laboratory/hospitals/${hospital_id}/patients/${patient_id}`;
  const response = await useFetchSingle<Patient>(url);
  console.log(response.data)
  return response;
};

export { useFetchPatientDetail };
