"use server"

import * as z from "zod"

import { getUserByEmail } from "@/data/user"
import { ResetSchema } from "@/schemas/auth.schema"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendpasswordResetEmail } from "@/lib/mail"
import { UserRole } from "@prisma/client"

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Email is invalid" }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: "Email not found" }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendpasswordResetEmail(passwordResetToken.email, passwordResetToken.token, UserRole.ADMIN)

  return { success: "Reset email sent" }
}
