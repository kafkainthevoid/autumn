"use client"

import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useState, useCallback, useEffect } from "react"

import { newVerification } from "@/actions/new-verification"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import CardWrapper from "./card-wrapper"

interface NewVerificationFormProps {}

const NewVerificationForm = ({}: NewVerificationFormProps) => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError("Missing token")
      return
    }

    console.log("newVeririfcation onsubmit")
    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError("Something went wrong")
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}

export default NewVerificationForm
