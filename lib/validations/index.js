import { z } from "zod";

export const signUpFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string(),
  email: z.string(),
  gender: z.string(),
  day: z.string(),
  month: z.string(),
  year: z.string(),
  password: z.string(),
  cpassword: z.string(),
});

export const logInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export const OtpFormSchema = z.object({
  otp: z.string().max(6, "Enter only 6 digits"),
});

export const signUpFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  day: "",
  month: "",
  year: "",
  password: "",
  cpassword: "",
};
export const logInFormDefaultValues = {
  email: "",
  password: "",
};
export const otpFormDefaultValues =  {
  otp: "",
};
