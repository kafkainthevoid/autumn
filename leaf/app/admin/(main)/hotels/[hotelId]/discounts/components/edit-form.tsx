"use client"

import { Discount, RoomType } from "@prisma/client"
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
import { Calendar } from "@/components/ui/calendar"
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

const formSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    discountPercent: z.coerce.number(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    roomTypeIds: z.string().array(),
  })
  .refine((data) => data.startDate < data.endDate)

interface FormProps {
  initialData: (Discount & { roomTypes: RoomType[] }) | null
  roomTypes: RoomType[]
}

const EditForm: FC<FormProps> = ({ initialData, roomTypes }) => {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? `Edit discount` : `Create discount`
  const description = initialData ? `Edit a discount` : `Add a new discount`
  const toastMessage = initialData ? `Discount updated` : `Discount created`
  const action = initialData ? "Save changes" : "Create"

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        discountPercent: 0,
        startDate: undefined,
        endDate: undefined,
        roomTypeIds: [],
      }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      if (initialData) {
        await axios.patch(`/api/discounts/${params.discountId}`, data)
      } else {
        await axios.post(`/api/discounts`, data)
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
      await axios.delete(`/api/discounts/${params.discountId}`)
      router.refresh()
      router.push(pathname.slice(0, pathname.lastIndexOf("/")))
      toast({ description: `Discount deleted` })
    } catch (err: any) {
      console.log(err)
      toast({ variant: "destructive", description: err?.response?.data })
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const options = roomTypes
  const [selectedValues, setSelectedValues] = useState<string[]>(initialData?.roomTypes.map((item) => item.id) || [])

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Name" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={10} disabled={loading} placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountPercent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percent</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="Discount Percent" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-32">Start Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? formatDate(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          disabled={(date) => date < new Date()}
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-32">End Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? formatDate(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          disabled={(date) => date < form.getValues().startDate}
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* TODO: hmmm, this needs to refactorio */}
            <FormField
              control={form.control}
              name="roomTypeIds"
              defaultValue={initialData?.roomTypes.map((rt) => rt.id) || []}
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-32">Room Types</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-dashed flex flex-wrap justify-between"
                        >
                          <div className="flex items-center">
                            <PlusCircleIcon className="mr-2 h-4 w-4" />
                            Choose room type
                          </div>
                          {selectedValues.length > 0 && (
                            <>
                              <Separator orientation="vertical" className="mx-2 h-4" />
                              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                {selectedValues.length}
                              </Badge>
                              <div className="hidden space-x-1 lg:flex">
                                {selectedValues.length > 3 ? (
                                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                    {selectedValues.length} selected
                                  </Badge>
                                ) : (
                                  options
                                    .filter((option) => selectedValues.find((item) => item === option.id))
                                    .map((option) => (
                                      <Badge
                                        variant="secondary"
                                        key={option.id}
                                        className="rounded-sm px-1 font-normal"
                                      >
                                        {option.name}
                                      </Badge>
                                    ))
                                )}
                              </div>
                            </>
                          )}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[300px] p-0" align="end">
                        <Command>
                          <CommandInput placeholder={"Leaf"} />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {options.map((option) => {
                                let isSelected = selectedValues.find((item) => item === option.id) ? true : false

                                return (
                                  <CommandItem
                                    key={option.id}
                                    onSelect={() => {
                                      if (isSelected) {
                                        const newSV = [...selectedValues].filter((item) => item !== option.id)
                                        field.onChange(newSV)
                                        setSelectedValues(newSV)
                                      } else {
                                        const newSV = [...selectedValues]
                                        newSV.push(option.id)
                                        field.onChange(newSV)
                                        setSelectedValues(newSV)
                                      }
                                    }}
                                  >
                                    <div
                                      className={cn(
                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                        isSelected
                                          ? "bg-primary text-primary-foreground"
                                          : "opacity-50 [&_svg]:invisible"
                                      )}
                                    >
                                      <CheckIcon className={cn("h-4 w-4")} />
                                    </div>
                                    <span>{option.name}</span>
                                  </CommandItem>
                                )
                              })}
                            </CommandGroup>
                            {selectedValues.length > 0 && (
                              <>
                                <CommandSeparator />
                                <CommandGroup>
                                  <CommandItem
                                    // onSelect={() => column?.setFilterValue(undefined)}
                                    className="justify-center text-center"
                                  >
                                    Clear filters
                                  </CommandItem>
                                </CommandGroup>
                              </>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
