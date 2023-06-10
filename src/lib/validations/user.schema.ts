import { z } from "zod";

export const RegisterUserSchema = z.object({
    username: z
        .string({ invalid_type_error: "Username must be a string" })
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters long"),
    email: z
        .string({ invalid_type_error: "Email must be a string" })
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string({ invalid_type_error: "Password must be a string" })
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
        .string({ invalid_type_error: "Confirm password must be a string" })
        .min(1, "Confirm password is required")
        .min(6, "Confirm password must be at least 6 characters long")
})
    .refine(data => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match"
    });

export const LoginUserSchema = z.object({
    username: z
        .string({ invalid_type_error: "Username must be a string" })
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters long"),
    password: z
        .string({ invalid_type_error: "Password must be a string" })
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long")
});

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;