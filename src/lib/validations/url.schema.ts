import { z } from "zod";

export const CreateShrinkUrlSchema = z.object({
    url: z
        .string({ invalid_type_error: "URL must be a string" })
        .min(1, "URL is required"),
    name: z
        .string({ invalid_type_error: "Name must be a string" })
        .optional()
});

export const CreateCustomUrlSchema = z.object({
    url: z
        .string({ invalid_type_error: "URL must be a string" })
        .min(1, "URL is required"),
    customUrl: z
        .string({ invalid_type_error: "CustomURL must be a string" })
        .min(1, "Custom URL is required"),
    name: z
        .string({ invalid_type_error: "Name must be a string" })
        .optional()
});

export type CreateShrinkUrlSchemaType = z.infer<typeof CreateShrinkUrlSchema>;
export type CreateCustomUrlSchemaType = z.infer<typeof CreateCustomUrlSchema>;