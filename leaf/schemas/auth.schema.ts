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
  password: z.string().regex(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d!@#$%^&*]{8,32}$/, "Mật khẩu không đúng định dạng"),
})

export const ResetSchema = z.object({
  email: z.string().email("Email không chính xác"),
})

export const LoginSchema = z.object({
  email: z.string().email("Email không chính xác"),
  password: z.string().regex(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d!@#$%^&*]{8,32}$/, "Mật khẩu không chính xác"),
  code: z.string().optional(),
})

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, "Tên phải chứa ít nhất 1 ký tự"),
    lastName: z.string().min(1, "Họ phải chứa ít nhất 1 ký tự"),
    phoneNumber: z.string().regex(phoneRegExp, "Số điện thoại không chính xác"),
    address: z.string().min(1, "Địa chỉ phải chứa ít nhất 1 ký tự").max(254),
    email: z.string().max(320).email({ message: "Email không đúng định dạng" }),
    password: z.string().regex(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d!@#$%^&*]{8,32}$/, "Mật khẩu không đúng định dạng"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Mật khẩu không giống nhau",
  })
