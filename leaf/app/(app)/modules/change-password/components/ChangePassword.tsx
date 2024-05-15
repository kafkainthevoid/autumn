"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "@/lib/axios"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { toast } from "sonner"
import { ExtendedUser } from "@/auth/next-auth"

const formSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string(),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPasswordConfirm === data.newPasswordConfirm, {
    // message: "Password do not match",
    message: "Mật khẩu không giống nhau",
    path: ["newPasswordConfirm"],
  })

type PasswordFormValues = z.infer<typeof formSchema>

const ChangePassword = ({ userAuth }: { userAuth: ExtendedUser }) => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  })

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      const res = await axios.post(`/api/users/${userAuth?.id}/change-password`, data)
      console.log("result", res)

      if (res.data.error) {
        setError(res.data.error)
      }

      if (res.data.success) {
        setSuccess(res.data.success)
      }

      router.refresh()
    } catch (err) {
      // toast.error("Something went wrong, please try again")
      toast.error("Đã có lỗi xảy ra, hảy thử lại.")
    }
  }

  return (
    <div>
      {/* <h1 className="tracking-tight text-3xl font-bold">Change password</h1> */}
      <h1 className="tracking-tight text-3xl font-bold">Thay đổi mật khẩu</h1>
      {userAuth.isOAuth ? (
        <div className="mt-10">
          <FormSuccess message="OAuth account, can not change password" />
        </div>
      ) : (
        <div className="border-[1px] rounded-2xl mt-6 p-9 px-16 flex">
          {/* TODO: add linked google, fb, etc... info like tiki */}
          {/* add change password */}
          {/* <div className='w-3/5 border-r-[1px] space-y-8'> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      {/* <FormLabel className="w-56 text-zinc-600">Old Password</FormLabel> */}
                      <FormLabel className="w-56 text-zinc-600">Mật khẩu cũ</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="Old password" {...field} /> */}
                        <Input placeholder="Mật khẩu cũ" {...field} />
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
                      {/* <FormLabel className="w-56 text-zinc-600">New Password</FormLabel> */}
                      <FormLabel className="w-56 text-zinc-600">Mật khẩu mới</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="New password" {...field} /> */}
                        <Input placeholder="Mật khẩu mới" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPasswordConfirm"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      {/* <FormLabel className="w-56 text-zinc-600">New Password Confirm</FormLabel> */}
                      <FormLabel className="w-56 text-zinc-600">Xác nhận mật khẩu mới</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="New password confirm" {...field} /> */}
                        <Input placeholder="Xác nhận mật khẩu mới" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormError message={error} />
                <FormSuccess message={success} />

                <Button className="ml-40" variant="teal" type="submit">
                  {/* Update password */}
                  Cập nhật mật khẩu
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  )
}

export default ChangePassword
