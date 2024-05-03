import { Resend } from "resend"

import { APP_URL } from "@/constants/url"
import { UserRole } from "@prisma/client"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  })
}

export const sendpasswordResetEmail = async (email: string, token: string, to: UserRole) => {
  const resetLink = `${APP_URL}/new-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password</p>`,
  })
}

export const sendVerificationEmail = async (email: string, token: string, to: UserRole) => {
  const confirmLink = `${APP_URL}/new-verification?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`,
  })
}
