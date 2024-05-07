"use client"

import React, { useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
// @ts-ignore
import ImageResize from "quill-image-resize-module-react"
import { Button } from "@/components/ui/button"
import { Post } from "@prisma/client"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "@/lib/axios"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

Quill.register("modules/imageResize", ImageResize)

interface EditPostProps {
  post: Post | null
}

const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  // TODO: change to 200 later
  content: z.string().min(10),
})

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
  imageResize: {
    parchment: Quill.import("parchment"),
  },
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
]

const EditPost = ({ post }: EditPostProps) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = post ? `Edit post` : `Create post`
  const description = post ? `Edit a post` : `Add a new post`
  const toastMessage = post ? `Post updated` : `Post created`
  const action = post ? "Save changes" : "Create"

  const defaultValues = post
    ? post
    : //  {
      //   title: post.title,
      //   author: post.author,
      //   content: post.content,
      //  }
      {
        title: "",
        author: "",
        content: "",
      }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("submitting data", data)
      setLoading(true)
      if (post) {
        await axios.patch("/api/posts", data)
      } else {
        await axios.post("/api/posts", data)
      }
      router.refresh()
      router.push(`/admin/posts`)
      toast.success("Post created")
    } catch (err: any) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Button variant="link" className="mb-10 px-0" size="sm" onClick={() => router.back()}>
            <ChevronLeftIcon className="w-6 h-6" /> Back
          </Button>
          <h1 className="tracking-tight text-3xl font-semibold">{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <hr className="mt-2 mb-10" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Author" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-10" disabled={loading} variant="blue" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default EditPost
