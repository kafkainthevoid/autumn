"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCurrentUser } from "@/hooks/use-current-user"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface ChangePasswordProps {}

const formSchema = z
  .object({
    oldPassword: z.string().min(3),
    newPassword: z.string().min(3),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password do not match",
    path: ["confirmNewPassword"],
  })

type ChangePasswordFormValues = z.infer<typeof formSchema>

const ChangePassword = ({}: ChangePasswordProps) => {
  const [loading, setLoading] = useState(false)
  const user = useCurrentUser()

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      setLoading(true)
      const res = await axios.post(`/api/users/${user?.id}/change-password`, data)
      if (res.data.error) toast.error(res.data.error)
      else toast.success(res.data.success)
    } catch (err) {
      console.log("[ChangePassword] err", err)
      toast.error("Something went wrong, can not change password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="tracking-tight text-3xl font-bold">Change Password</h1>
      <div className="border-[1px] rounded-2xl mt-6 p-9 px-16 flex">
        {user?.isOAuth !== true ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-56 text-zinc-600">Old password</FormLabel>
                      <FormControl>
                        <Input placeholder="Old password" {...field} disabled={loading} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-56 text-zinc-600">New password</FormLabel>
                      <FormControl>
                        <Input placeholder="New password" {...field} disabled={loading} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-56 text-zinc-600">Confirm new password</FormLabel>
                      <FormControl>
                        <Input placeholder="Confirm new password" {...field} disabled={loading} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="ml-40" variant="blue" type="submit">
                  Change Password
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div>This is a OAuth account, can not change password</div>
        )}
      </div>
    </div>
  )
}

export default ChangePassword
