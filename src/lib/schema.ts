import * as z from "zod";

export const appointmentFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional()
    .or(z.literal("")),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  category: z.string().min(1, {
    message: "Please select a service category.",
  }),
  location: z.string().optional(),
});
