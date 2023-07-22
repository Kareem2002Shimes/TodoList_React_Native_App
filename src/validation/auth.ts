import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(40),
});
export const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: "First Name is required" }),
    lastName: z.string().trim().min(1, { message: "Last Name is required" }),
    email: z.string().trim().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(40),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
