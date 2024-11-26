import { ApiResponse } from "../../../hooks/usePostData";
import { useFetchSingle } from "../../../hooks/useUserFetchData";
import { DiagnosisReport} from "./useFetchPatient";

const useFetchReportDetail = async (
  patient_id: string,
  medical_id: string,
  result_id: string

): Promise<ApiResponse<DiagnosisReport>> => {
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

  const url = `laboratory/hospitals/${hospital_id}/patients/${patient_id}/medical-datas/${medical_id}/diagnosis-reports/${result_id}`;
  const response = await useFetchSingle<DiagnosisReport>(url);
  console.log(response.data)
  return response;
};

export { useFetchReportDetail };
