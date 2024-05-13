"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"

import { Button, buttonVariants } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { z } from "zod"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/actions/login"
import FormError from "../form-error"
import FormSuccess from "../form-success"
import Social from "./social"
import { LoginSchema } from "@/schemas/auth.schema"

const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" ? "Email đã được dùng với một tài khoản khác" : ""

  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data.error) {
            form.reset()
            setError(data.error)
          }

          if (data.success) {
            form.reset()
            setSuccess(data.success)
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => setError("Something went wrong"))
    })
  }

  return (
    <div className="mt-20">
      <div className="h-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập</h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="Mật khẩu" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormError message={error || urlError} />
                <FormSuccess message={success} />

                <Button disabled={isPending} size="sm" className={cn(buttonVariants({ variant: "teal" }), "mt-4")}>
                  Đăng nhập
                </Button>
              </div>

              <div className="space-y-3 mt-4">
                {/* <Label>Đăng nhập với Google</Label> */}
                <Social />

                <p className="px-8 text-center text-sm text-muted-foreground">
                  Bạn chưa có tài khoản?
                  <Link href="/register" className={cn(buttonVariants({ variant: "link" }), "text-teal-600")}>
                    Đăng ký
                  </Link>
                </p>

                <p className="px-8 text-center text-sm text-muted-foreground">
                  <Link href="/reset" className={cn(buttonVariants({ variant: "link" }), "text-teal-600")}>
                    Quên mật khẩu
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
