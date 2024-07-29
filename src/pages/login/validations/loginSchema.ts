import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().nonempty(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
