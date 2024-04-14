"use client"

import { Address, Discount, RoomType, Sex, User } from "@prisma/client"
import { useParams, usePathname, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { CalendarIcon, CheckIcon, ChevronLeftIcon, PlusCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar2"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { formatDate } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]),
  phoneNumber: z.string().optional(),
  addressLine: z.string().optional(),
})

interface FormProps {
  initialData: (User & { address: Address | null }) | null
}

const EditForm: FC<FormProps> = ({ initialData }) => {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? `Edit staff info` : `Create staff`
  const description = initialData ? `Edit staff` : `Add new staff`
  const toastMessage = initialData ? `Staff info updated` : `New staff created`
  const action = initialData ? "Save changes" : "Create"

  const defaultValues = {
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    email: initialData?.email ?? "",
    dateOfBifth: initialData?.birthday ?? new Date(),
    gender: initialData?.sex ?? Sex.UNKNOWN,
    phoneNumber: initialData?.address?.phone ?? "",
    addressLine: initialData?.address?.addressLine ?? "",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      if (initialData) {
        await axios.patch(`/api/staffs/${params.staffId}`, data)
      } else {
        await axios.post(`/api/staffs`, data)
      }
      router.refresh()
      router.push(pathname.slice(0, pathname.lastIndexOf("/")))
      toast({ description: toastMessage })
    } catch (err: any) {
      console.log(err)
      toast({ variant: "destructive", title: err.response.data })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/staffs/${params.staffId}`)
      router.refresh()
      router.push(pathname.slice(0, pathname.lastIndexOf("/")))
      toast({ description: `Staff deleted` })
    } catch (err: any) {
      console.log(err)
      toast({ variant: "destructive", description: err?.response?.data })
    } finally {
      setLoading(false)
      setOpen(false)
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
      <Separator className="mt-2" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-10 space-y-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-32">Date of birth</FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? formatInTimeZone(new Date(field.value), "Asia/Ho_Chi_Minh", "PPP")
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className=" w-auto p-0">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown-buttons"
                              selected={field.value}
                              onSelect={(date) => field.onChange(date)}
                              fromYear={1960}
                              toYear={2030}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </div>
                  </FormItem>
                )
              }}
            />
          </div>

          <Button className="mt-10" disabled={loading} variant="blue" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default EditForm
