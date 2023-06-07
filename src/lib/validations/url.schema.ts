import { z } from "zod";

export const CreateShrinkUrlSchema = z.object({
    url: z
        .string({ required_error: "URL is required" })
        .min(1, "URL is required")
});

export const createCustomUrlSchema = z.object({
    url: z
        .string({ required_error: "URL is required" })
        .min(1, "URL is required"),
    customUrl: z
        .string({ required_error: "Custom URL is required" })
        .min(1, "Custom URL is required"),
});

export type CreateShrinkUrlSchemaType = z.infer<typeof CreateShrinkUrlSchema>;
export type createCustomUrlSchemaType = z.infer<typeof createCustomUrlSchema>;