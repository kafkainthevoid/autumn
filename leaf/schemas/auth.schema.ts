import { UserRole } from "@prisma/client"
import * as z from "zod"

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.STAFF]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false
      return true
    },
    { message: "New password is required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false
      return true
    },
    { message: "Password is required", path: ["password"] }
  )

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
})

export const ResetSchema = z.object({
  email: z.string().email(),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.string().optional(),
})

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const RegisterSchema = z
  .object({
    firstName: z.string().min(3, "Firstname must be atleast 3 characters"),
    lastName: z.string().min(3, "Lastname must be atleast 3 characters"),
    phoneNumber: z.string().regex(phoneRegExp, "Invalid phone number"),
    address: z.string().min(3, "Incorrect address").max(254),
    email: z.string().max(320).email({ message: "Not a valid email" }),
    password: z.string().min(8, "Password must be atleast 8 characters").max(32),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password don't match",
  })
