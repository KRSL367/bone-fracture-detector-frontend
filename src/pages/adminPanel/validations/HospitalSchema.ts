import { z } from 'zod';

export const hospitalSchema = z.object({
    name: z.string().min(1, { message: "Hospital name is required" }),
    phone:  z.string().min(1, { message: "Phone number is required" }),
});

export type hospitalSchema = z.infer<typeof hospitalSchema>;
