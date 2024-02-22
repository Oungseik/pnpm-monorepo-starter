import { z } from "zod";

const passwordValidationSchema = z.object({
  password: z.string().min(8).max(20),
  passwordConfirm: z.string().min(8).max(20),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const registerSchema = passwordValidationSchema
  .extend({ email: z.string().email() })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password does not match.",
    path: ["passwordConfirm"],
  });
