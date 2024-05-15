"use client"

import React, { useRef, useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
// @ts-ignore
import { Button } from "@/components/ui/button"
import { Post } from "@prisma/client"
import { ChevronLeftIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "@/lib/axios"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// import ImageResize from "quill-image-resize-module-react"
// Quill.register("modules/imageResize", ImageResize)

interface EditPostProps {
  post: Post | null
}

const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  description: z.string().optional(),
  banner: z.string(),
  // TODO: change to 200 later
  content: z.string().min(10),
})

const modules = {
  imageActions: {},
  imageFormats: {},
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
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
  "float",
  "link",
  "image",
]

import { ImageActions } from "@xeger/quill-image-actions"
import { ImageFormats } from "@xeger/quill-image-formats"
import ImageUpload from "@/components/ui/image-upload"

Quill.register("modules/imageActions", ImageActions, true)
Quill.register("modules/imageFormats", ImageFormats, true)

const EditPost = ({ post }: EditPostProps) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // const title = post ? `Edit post` : `Create post`
  // const description = post ? `Edit a post` : `Add a new post`
  // const toastMessage = post ? `Post updated` : `Post created`
  // const action = post ? "Save changes" : "Create"

  const title = post ? `Sửa bài viết` : `Thêm bài viết`
  const description = post ? `Sửa bài viết` : `Thêm bài viết mới`
  const toastMessage = post ? `Đã cập nhật thành công` : `Đã tạo thành công`
  const action = post ? "Cập nhật" : "Tạo"

  const defaultValues = post ?? {
    title: "",
    author: "",
    content: "",
    banner: "",
    description: "",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      let description = quillRef.current?.editor?.getText() ?? ""
      description = description.replace(/\s{6,}|\n/g, " ")

      if (description.length > 150) description = description.slice(0, 147) + "..."

      data = { ...data, description }

      setLoading(true)
      if (post) {
        await axios.patch(`/api/posts/${params.postId}`, data)
      } else {
        await axios.post("/api/posts", data)
      }
      router.refresh()
      router.push(`/admin/posts`)
      toast.success(toastMessage)
    } catch (err: any) {
      toast.error("Đã xảy ra lỗi")
    } finally {
      setLoading(false)
    }
  }

  const quillRef = useRef<ReactQuill | null>(null)

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
                {/* <FormLabel>Title</FormLabel> */}
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  {/* <Input disabled={loading} placeholder="Title" {...field} /> */}
                  <Input disabled={loading} placeholder="Tiêu đề" {...field} />
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
                {/* <FormLabel>Author</FormLabel> */}
                <FormLabel>Tác giả</FormLabel>
                <FormControl>
                  {/* <Input disabled={loading} placeholder="Author" {...field} /> */}
                  <Input disabled={loading} placeholder="Tác giả" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Image</FormLabel> */}
                <FormLabel>Ảnh bìa</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
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
                {/* <FormLabel>Content</FormLabel> */}
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={field.value}
                    onChange={(v) => {
                      field.onChange(v)
                      console.log(v)
                    }}
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
