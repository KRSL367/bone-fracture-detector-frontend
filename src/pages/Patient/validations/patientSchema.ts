import { z } from 'zod';

export const patientSchema = z.object({
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    birth_date: z.string().min(1, { message: "Birth date is required" }),
    hospital: z.string().min(1, { message: "hospital_id is required" }),
    
    });

export type PatientSchema = z.infer<typeof patientSchema>;
