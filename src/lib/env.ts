// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  CONTACT_EMAIL: z
    .string()
    .email("CONTACT_EMAIL must be a valid email address")
    .optional()
    .default("contact@plexuscode.com"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .optional()
    .default("development"),
});

export const env = envSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  NODE_ENV: process.env.NODE_ENV,
});

export type Env = z.infer<typeof envSchema>;