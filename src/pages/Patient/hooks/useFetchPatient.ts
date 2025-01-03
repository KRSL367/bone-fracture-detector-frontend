import { ApiResponse, useFetchData } from "../../../hooks/useFetchData";

export interface Image {
  id: number;
  image: string;
  medical_data: number;
  diagnosis_report: number;
}

export interface DiagnosisImage {
  id?: number;
  image: string;
  diagnosis_report: number;
}

export interface DiagnosisReport {
  id?: number;
  medical_data: number;
  report: string;
  created_at: string;
  diagnosis_images: DiagnosisImage[];
}

export interface MedicalData {
  id?: number;
  description: string;
  uploaded_at?: string;
  images?: Image[];
  diagnosis_report?: DiagnosisReport[];
}

export interface Patient {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  phone: string;
  hospital?: string;
  medical_datas?: MedicalData[];
}

const useFetchPatient = async (
    page: number = 1, // Default to the first page
    additionalParams: Record<string, any> = {} // Allow custom query parameters
  ): Promise<ApiResponse<Patient>> => {
    const userString = localStorage.getItem("user");
  
    let hospital_id = null;
  
    if (userString) {
      try {
        const user = JSON.parse(userString); // Parse the user string into an object
        hospital_id = user.hospital_id; // Access the hospital_id
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  
    if (!hospital_id) {
      throw new Error("Hospital ID is not available in the user data");
    }
  
    const url = `laboratory/hospitals/${hospital_id}/patients`;
  
    // Merge pagination and additional query parameters
    const params = { page, ...additionalParams };
  
    const response = await useFetchData<Patient>(url, params);
  
    return response;
  };

export { useFetchPatient };
