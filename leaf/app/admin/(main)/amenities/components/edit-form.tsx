"use client"

import { FC, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { z } from "zod"
import axios from "axios"
import { ChevronLeftIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Amenity, AmenityType } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "@/components/ui/image-upload"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(1, "Name length must be atleast 4 characters only"),
  description: z.string().min(1),
  price: z.coerce.number(),
  image: z.string(),
  type: z.enum([AmenityType.DISPLAY, AmenityType.PURCHASABLE]),
})

type FormValues = z.infer<typeof formSchema>

interface FormProps {
  initialData: Amenity | null
}

const EditForm: FC<FormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  // const title = initialData ? `Edit amenity` : `Create amenity`
  // const description = initialData ? `Edit a amenity` : `Add a new amenity`
  // const toastMessage = initialData ? `Amenity updated` : `Amenity created`
  // const action = initialData ? "Save changes" : "Create"

  const title = initialData ? `Sửa tiện ích` : `Tạo mới tiện ích`
  // const description = initialData ? `Edit a amenity` : `Add a new amenity`
  const toastMessage = initialData ? `Đã cập nhật thành công` : `Đã tạo thành công`
  const action = initialData ? "Cập nhật" : "Tạo"

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        price: 0,
        type: AmenityType.DISPLAY,
        image: "",
      }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      console.log(data)
      if (initialData) {
        await axios.patch(`/api/amenities/${params.amenityId}`, data)
      } else {
        await axios.post(`/api/amenities`, data)
      }
      router.refresh()
      router.push("/admin/amenities")
      toast.success(toastMessage)
    } catch (error: any) {
      // toast.error("Something went wrong")
      toast.error("Đã xảy ra lỗi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Button variant="link" className="mb-10 px-0" size="sm" onClick={() => router.back()}>
            {/* <ChevronLeftIcon className="w-6 h-6" /> Back */}
            <ChevronLeftIcon className="w-6 h-6" /> Trở về
          </Button>
          <h1 className="tracking-tight text-3xl font-semibold">{title}</h1>
          {/* <p>{description}</p> */}
        </div>
      </div>
      <Separator className="mt-2" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-10 w-full space-y-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Name</FormLabel> */}
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    {/* <Input disabled={loading} placeholder="Name" {...field} /> */}
                    <Input disabled={loading} placeholder="Tên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Description</FormLabel> */}
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    {/* <Textarea disabled={loading} placeholder="Description" rows={10} {...field} /> */}
                    <Textarea disabled={loading} placeholder="Mô tả" rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  {/* <FormLabel className="w-56 text-zinc-600">Type</FormLabel> */}
                  <FormLabel className="w-56 text-zinc-600">Loại</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="flex items-center w-full"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            // take me the whole morning, never gonna use shadcn again
                            // wow,
                            checked={field.value === AmenityType.DISPLAY}
                            value={AmenityType.DISPLAY}
                          />
                        </FormControl>
                        {/* <FormLabel className="font-normal">Display</FormLabel> */}
                        <FormLabel className="font-normal">Hiển thị</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0 ml-10">
                        <FormControl>
                          <RadioGroupItem
                            checked={field.value === AmenityType.PURCHASABLE}
                            value={AmenityType.PURCHASABLE}
                          />
                        </FormControl>
                        {/* <FormLabel className="font-normal">Purchasable</FormLabel> */}
                        <FormLabel className="font-normal">Tính phí</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {form.getValues().type === AmenityType.PURCHASABLE && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Price</FormLabel> */}
                    <FormLabel>Giá</FormLabel>
                    <FormControl>
                      {/* <Input disabled={loading} placeholder="Price" {...field} type="number" /> */}
                      <Input disabled={loading} placeholder="Giá" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Image</FormLabel> */}
                  <FormLabel>Ảnh</FormLabel>
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
          </div>

          <Button className="mt-10" disabled={loading} type="submit" variant="blue">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default EditForm
