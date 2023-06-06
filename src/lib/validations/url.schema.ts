import { z } from "zod";

export const CreateShrinkUrlSchema = z.object({
    url: z
        .string({ required_error: "URL is required" })
        .min(1, "URL is required")
});

export type CreateShrinkUrlSchemaType = z.infer<typeof CreateShrinkUrlSchema>;