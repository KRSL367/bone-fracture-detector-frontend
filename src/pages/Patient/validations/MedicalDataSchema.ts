import { z } from 'zod';

export const medicalDataSchema = z.object({
    description: z.string().min(1, { message: "Description is required" }),

    });

export type MedicalDataSchema = z.infer<typeof medicalDataSchema>;
