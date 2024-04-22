"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { RegisterSchema } from "@/schemas/auth.schema"

interface RegisterFormProps {}

const RegisterForm = ({}: RegisterFormProps) => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {},
  })

  return <div></div>
}

export default RegisterForm
