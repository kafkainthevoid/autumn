"use client"

import { Address, Amenity, AmenityType, Amenity_Hotel, Hotel } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { CheckIcon, ChevronLeftIcon, PlusCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
// import MapMarkerInput from "@/components/admin/map/MapMarkerInput"
import { Combobox } from "@/components/ui/combobox-form"
import * as AddressService from "../services/AddressService"
import { DaNangLatLng } from "@/constants/DaNangLatLng"
import MapMarkerInput from "@/app/(app)/modules/commons/map/MapMarkerInput"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  coordinate: z.string(),
  addressLine: z.string(),
  ward: z.number(),
  district: z.number(),
  province: z.number(),
  phoneNumber: z.string(),
  images: z.string().array(),
  displayAmenities: z.string().array(),
  purchasableAmenities: z.string().array(),
})

interface FormProps {
  initialData:
    | (Hotel & {
        amenity_Hotels: (Amenity_Hotel & { amenity: Amenity })[]
        address: Address
      })
    | null
  amenities: Amenity[]
}

type AddressVm = { name: string; code: number }

// TODO: This is stupid
const EditForm: FC<FormProps> = ({ initialData, amenities }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // const title = initialData ? `Edit hotel` : `Create hotel`
  // const description = initialData ? `Edit a hotel` : `Add a new hotel`
  // const toastMessage = initialData ? `Hotel updated` : `Hotel created`
  // const action = initialData ? "Save changes" : "Create"

  const title = initialData ? `Sửa khách sạn` : `Cập nhật khách sạn`
  const toastMessage = initialData ? `Đã cập nhật thành công` : `Đã tạo thành công`
  const action = initialData ? "Cập nhật" : "Tạo"

  const [provinces, setProvinces] = useState<AddressVm[]>([])
  const [districts, setDistricts] = useState<AddressVm[]>([])
  const [wards, setWards] = useState<AddressVm[]>([])

  let initDisplayAmenities: Amenity[] = []
  let initPurchasableAmenities: Amenity[] = []

  if (initialData) {
    const hotelAmenities = initialData.amenity_Hotels.map((ah) => ah.amenity)
    initDisplayAmenities = hotelAmenities.filter((amenity) => amenity.type === AmenityType.DISPLAY)
    initPurchasableAmenities = hotelAmenities.filter((amenity) => amenity.type === AmenityType.PURCHASABLE)
  }

  const defaultValues = initialData
    ? {
        name: initialData.name,
        description: initialData.description,
        coordinate: initialData.address.coordinate as string,
        addressLine: initialData.address.addressLine,
        ward: initialData.address.ward!,
        district: initialData.address.district!,
        province: initialData.address.province!,
        phoneNumber: initialData.address.phone,
        images: initialData.images,
        displayAmenities: initDisplayAmenities.map((a) => a.id),
        purchasableAmenities: initPurchasableAmenities.map((a) => a.id),
      }
    : {
        name: "",
        description: "",
        coordinate: DaNangLatLng.join(","),
        addressLine: "",
        ward: -1,
        district: -1,
        province: -1,
        phoneNumber: "",
        images: [],
        displayAmenities: [],
        purchasableAmenities: [],
      }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    AddressService.getProvinces().then((data) => {
      console.log(data)
      console.log(Array.isArray(data))
      setProvinces(data)
    })
    if (initialData?.address.province) {
      if (initialData.address) {
        AddressService.getDistricts(initialData.address.province).then((data) => {
          setDistricts(data)
        })
        AddressService.getWards(initialData.address.district!).then((data) => {
          setWards(data)
        })
      }
    }
  }, [initialData?.address])

  const onProvinceChange = (provinceCode: number) => {
    setWards([])
    AddressService.getDistricts(provinceCode).then((data) => setDistricts(data))
  }

  const onDistrictChange = (districtCode: number) => {
    AddressService.getWards(districtCode).then((data) => setWards(data))
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("onSubmit", { data })
      setLoading(true)

      const formAmenities = [...data.purchasableAmenities, ...data.displayAmenities]

      // TODO: fix this later
      // data.hasOwnProperty("purchasableAmenities") && delete data.purchasableAmenities
      // data.hasOwnProperty("displayAmenities") && delete data.displayAmenities
      const payload = { ...data, amenities: formAmenities }

      if (initialData) {
        await axios.patch(`/api/hotels/${params.hotelId}`, payload)
      } else {
        await axios.post(`/api/hotels`, payload)
      }
      router.refresh()
      router.push(`/admin/hotels`)
      toast.success(toastMessage)
    } catch (err: any) {
      console.log(err)
      toast.error(err?.response?.data)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/hotels/${params.hotelId}`)
      router.refresh()
      router.push(`/admin/hotels`)
      toast.success("Hotel deleted")
    } catch (err: any) {
      console.log(err)
      toast.error(err?.response?.data)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const displayOptions = amenities.filter((a) => a.type === AmenityType.DISPLAY)
  const purchasableOptions = amenities.filter((a) => a.type === AmenityType.PURCHASABLE)
  const [selectedDisplayAmenities, setSelectedDisplayAmenities] = useState<string[]>(
    initDisplayAmenities.map((a) => a.id)
  )
  const [selectedPurchasableAmenities, setSelectedPurchasableAmenities] = useState<string[]>(
    initPurchasableAmenities.map((a) => a.id)
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Button variant="link" className="mb-10 px-0" size="sm" onClick={() => router.back()}>
            <ChevronLeftIcon className="w-6 h-6" /> Trở về
          </Button>
          <h1 className="tracking-tight text-3xl font-semibold">{title}</h1>
          {/* <p>{description}</p> */}
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
                    {/* <Textarea rows={10} disabled={loading} placeholder="Description" {...field} /> */}
                    <Textarea rows={10} disabled={loading} placeholder="Mô tả" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-10">
              <div className="w-1/3 space-y-5">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      {/* <FormLabel>Province</FormLabel> */}
                      <FormLabel>Tỉnh/Thành phố</FormLabel>
                      <Combobox
                        data={provinces.map((p) => ({
                          value: p.code,
                          label: p.name,
                        }))}
                        label="Province"
                        onValueChange={(val) => {
                          field.onChange(provinces.find((p) => p.code === val)?.code)
                          form.setValue("district", -1)
                          form.setValue("ward", -1)
                          onProvinceChange(val)
                        }}
                        value={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      {/* <FormLabel>District</FormLabel> */}
                      <FormLabel>Quận/Huyện</FormLabel>
                      <Combobox
                        data={districts.map((d) => ({
                          value: d.code,
                          label: d.name,
                        }))}
                        label="District"
                        onValueChange={(val) => {
                          field.onChange(districts.find((p) => p.code === val)?.code)
                          form.setValue("ward", -1)
                          onDistrictChange(val)
                        }}
                        value={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      {/* <FormLabel>Ward</FormLabel> */}
                      <FormLabel>Phường/Xã</FormLabel>
                      <Combobox
                        data={wards.map((w) => ({
                          value: w.code,
                          label: w.name,
                        }))}
                        label="Ward"
                        onValueChange={(val) => field.onChange(wards.find((w) => w.code === val)?.code)}
                        value={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressLine"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {/* <FormLabel>Address</FormLabel> */}
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        {/* <Input disabled={loading} placeholder="Address" {...field} /> */}
                        <Input disabled={loading} placeholder="Địa chỉ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Hotel Phone Number</FormLabel> */}
                      <FormLabel>Số điện thoại khách sạn</FormLabel>
                      <FormControl>
                        {/* <Input disabled={loading} placeholder="Phone number" {...field} /> */}
                        <Input disabled={loading} placeholder="Số điện thoại" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="coordinate"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Coordinate</FormLabel> */}
                    <FormLabel>Địa điểm trên bản đồ</FormLabel>
                    <FormControl>
                      <div className="w-[1000px] h-[600px]">
                        <MapMarkerInput
                          zoom={13}
                          // @ts-ignore
                          pos={field.value.split(",").map((v) => +v)}
                          // @ts-ignore
                          setPos={(val) => field.onChange(val.join(","))}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Images</FormLabel> */}
                  <FormLabel>Ảnh</FormLabel>
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

            {/* TODO: hmmm, this needs to refactorio*/}
            <FormField
              control={form.control}
              name="displayAmenities"
              defaultValue={initDisplayAmenities.map((a) => a.id)}
              render={({ field }) => (
                <FormItem className="flex items-center">
                  {/* <FormLabel className="w-44">Display Amenities</FormLabel> */}
                  <FormLabel className="w-44">Dịch vụ hiển thị</FormLabel>
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
                            {/* Choose amenity */}
                            Chọn dịch vụ
                          </div>
                          {selectedDisplayAmenities.length > 0 && (
                            <>
                              <Separator orientation="vertical" className="mx-2 h-4" />
                              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                {selectedDisplayAmenities.length}
                              </Badge>
                              <div className="hidden space-x-1 lg:flex">
                                {selectedDisplayAmenities.length > 5 ? (
                                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                    {selectedDisplayAmenities.length} selected
                                  </Badge>
                                ) : (
                                  displayOptions
                                    .filter((option) => selectedDisplayAmenities.find((item) => item === option.id))
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
                          <CommandInput placeholder={"Choose amenity"} />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {displayOptions.map((option) => {
                                let isSelected = selectedDisplayAmenities.find((item) => item === option.id)
                                  ? true
                                  : false

                                return (
                                  <CommandItem
                                    key={option.id}
                                    onSelect={() => {
                                      if (isSelected) {
                                        const newSV = [...selectedDisplayAmenities].filter((item) => item !== option.id)
                                        field.onChange(newSV)
                                        setSelectedDisplayAmenities(newSV)
                                      } else {
                                        const newSV = [...selectedDisplayAmenities]
                                        newSV.push(option.id)
                                        field.onChange(newSV)
                                        setSelectedDisplayAmenities(newSV)
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
                            {selectedDisplayAmenities.length > 0 && (
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

            <FormField
              control={form.control}
              name="purchasableAmenities"
              defaultValue={initPurchasableAmenities.map((a) => a.id)}
              render={({ field }) => (
                <FormItem className="flex items-center">
                  {/* <FormLabel className="w-44">Purchasable Amenities</FormLabel> */}
                  <FormLabel className="w-44">Dịch vụ tính phí</FormLabel>
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
                            {/* Choose amenity */}
                            Chọn dịch vụ
                          </div>
                          {selectedPurchasableAmenities.length > 0 && (
                            <>
                              <Separator orientation="vertical" className="mx-2 h-4" />
                              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                {selectedPurchasableAmenities.length}
                              </Badge>
                              <div className="hidden space-x-1 lg:flex">
                                {selectedPurchasableAmenities.length > 5 ? (
                                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                    {selectedPurchasableAmenities.length} selected
                                  </Badge>
                                ) : (
                                  purchasableOptions
                                    .filter((option) => selectedPurchasableAmenities.find((item) => item === option.id))
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
                          <CommandInput placeholder={"Choose amenity"} />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {purchasableOptions.map((option) => {
                                let isSelected = selectedPurchasableAmenities.find((item) => item === option.id)
                                  ? true
                                  : false

                                return (
                                  <CommandItem
                                    key={option.id}
                                    onSelect={() => {
                                      if (isSelected) {
                                        const newSV = [...selectedPurchasableAmenities].filter(
                                          (item) => item !== option.id
                                        )
                                        field.onChange(newSV)
                                        setSelectedPurchasableAmenities(newSV)
                                      } else {
                                        const newSV = [...selectedPurchasableAmenities]
                                        newSV.push(option.id)
                                        field.onChange(newSV)
                                        setSelectedPurchasableAmenities(newSV)
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
                            {selectedPurchasableAmenities.length > 0 && (
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
