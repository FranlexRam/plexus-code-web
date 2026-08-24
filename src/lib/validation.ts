// src/lib/validation.ts
import { z } from "zod";

export function sanitizeInput(str: string): string {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    .replace(/on\w+=\w+/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/[<>]/g, "");
}

export const NAME_REGEX = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]{2,60}$/;
export const PHONE_REGEX = /^\+?[0-9\s().-]{7,20}$/;
export const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const MALICIOUS_PATTERNS = /(<script|alert\(|UNION\s+SELECT|SELECT\s+.*\s+FROM|--|;\s*DROP\s+TABLE)/i;

export const contactSchema = z.object({
  country: z.string().min(2).max(60),
  topic: z.string().min(2).max(100),
  name: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(NAME_REGEX, "Invalid name characters")
    .refine((val) => !MALICIOUS_PATTERNS.test(val), "Malicious pattern detected"),
  company: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .refine((val) => !MALICIOUS_PATTERNS.test(val), "Malicious pattern detected"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(STRICT_EMAIL_REGEX, "Invalid corporate email"),
  phone: z
    .string()
    .trim()
    .regex(PHONE_REGEX, "Invalid phone number"),
  message: z
    .string()
    .trim()
    .min(10)
    .max(3000)
    .refine((val) => !MALICIOUS_PATTERNS.test(val), "Script tags or injection payloads rejected"),
});

export type ContactFormData = z.infer<typeof contactSchema>;