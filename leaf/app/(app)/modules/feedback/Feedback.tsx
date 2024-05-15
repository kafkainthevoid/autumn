"use client"

import { FC, useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import axios from "@/lib/axios"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Feedback as FeedbackVm } from "@prisma/client"
import { toast } from "sonner"

interface FeedbackProps {
  userId: string
  feedbacks: FeedbackVm[]
}

const formSchema = z.object({
  content: z.string().min(20),
})

type FormValues = z.infer<typeof formSchema>

const Feedback: FC<FeedbackProps> = ({ userId, feedbacks }) => {
  const router = useRouter()

  const [changed, setChanged] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await axios.post("/api/feedbacks", { content: data.content, userId })
      setChanged((v) => !v)
      form.reset()
      router.refresh()
    } catch (err) {
      toast.error("Đã có lỗi xảy ra, hãy thử lại lần nữa")
      // toast({
      //   title: "Error",
      //   description: "Something went wrong, please try again.",
      //   variant: "destructive",
      // })
    }
  }

  return (
    <div className="w-full">
      {/* <h1 className="tracking-tight text-3xl font-bold">Feedback</h1> */}
      <h1 className="tracking-tight text-3xl font-bold">Phản hồi</h1>
      <div className="border-[1px] rounded-2xl mt-6 p-9 px-16 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border-b pb-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {/* <div className="font-semibold text-xl">Write your feedback</div> */}
                    <div className="font-semibold text-xl">Viết phản hồi</div>
                  </FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button className="mt-4" variant="teal" type="submit">
                Gửi
                {/* Send feedback */}
              </Button>
            </div>
          </form>
        </Form>
        <div className="h-[300px] overflow-y-scroll">
          {feedbacks.map((feedback, i) => (
            <div key={i} className="border-b w-full py-3">
              <div className="text-xs italic">{new Date(feedback.createdAt).toDateString()}</div>
              <div className="text-sm">{feedback.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feedback
