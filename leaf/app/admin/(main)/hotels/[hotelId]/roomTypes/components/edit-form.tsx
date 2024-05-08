"use client"

import { Amenity, Amenity_RoomType, RoomType } from "@prisma/client"
import { useParams, usePathname, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { CheckIcon, ChevronLeftIcon, PlusCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
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
import ImageUpload from "@/components/ui/image-upload"

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  images: z.string().array(),
  occupancy: z.coerce.number().min(1),
  numBeg: z.coerce.number().min(1),
  price: z.coerce.number(),
  amenities: z.string().array(),
})

interface FormProps {
  initialData:
    | (RoomType & {
        amenity_RoomTypes: (Amenity_RoomType & { amenity: Amenity })[]
      })
    | null
  amenities: Amenity[]
}

const EditForm: FC<FormProps> = ({ initialData, amenities }) => {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? `Edit Room Type` : `Create room type`
  const description = initialData ? `Edit a room type` : `Add a new room type`
  const toastMessage = initialData ? `Room type updated` : `Room type created`
  const action = initialData ? "Save changes" : "Create"

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        images: [],
        discountPercent: 0,
        startDate: undefined,
        endDate: undefined,
        roomTypeIds: [],
        amenities: [],
      }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      if (initialData) {
        await axios.patch(`/api/roomTypes/${params.roomTypeId}`, data)
      } else {
        await axios.post(`/api/roomTypes`, { ...data, hotelId: params.hotelId })
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
      await axios.delete(`/api/roomTypes/${params.roomTypeId}`)
      router.refresh()
      router.push(pathname.slice(0, pathname.lastIndexOf("/")))
      toast({ description: `Room type deleted` })
    } catch (err: any) {
      console.log(err)
      toast({ variant: "destructive", description: err?.response?.data })
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const options = amenities
  const [selectedValues, setSelectedValues] = useState<string[]>(
    initialData?.amenity_RoomTypes.map((item) => item.amenityId) || []
  )

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
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((img) => img)}
                      disabled={loading}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) => field.onChange([...field.value.filter((item) => item !== url)])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupancy"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-32">Occupancy</FormLabel>
                  <FormControl>
                    <Input className="w-[280px]" type="number" disabled={loading} placeholder="Occupancy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numBeg"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-32">Number of beg</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[280px]"
                      type="number"
                      disabled={loading}
                      placeholder="Number of beg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-32">Price</FormLabel>
                  <FormControl>
                    <Input className="w-[280px]" type="number" disabled={loading} placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: hmmm */}
            <FormField
              control={form.control}
              name="amenities"
              defaultValue={initialData?.amenity_RoomTypes.map((ar) => ar.amenityId) || []}
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-32">Amenities</FormLabel>
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
                            Choose amenity
                          </div>
                          {selectedValues.length > 0 && (
                            <>
                              <Separator orientation="vertical" className="mx-2 h-4" />
                              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                {selectedValues.length}
                              </Badge>
                              <div className="hidden space-x-1 lg:flex">
                                {selectedValues.length > 5 ? (
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
