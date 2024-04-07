'use client'

import { FC, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import axios from 'axios'
import { ChevronLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Amenity } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/ui/image-upload'

const formSchema = z.object({
  name: z.string().min(1, 'Name length must be atleast 4 characters only'),
  description: z.string().min(1),
  image: z.string(),
})

type FormValues = z.infer<typeof formSchema>

interface FormProps {
  initialData: Amenity | null
}

const EditForm: FC<FormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const title = initialData ? `Edit amenity` : `Create amenity`
  const description = initialData ? `Edit a amenity` : `Add a new amenity`
  const toastMessage = initialData ? `Amenity updated` : `Amenity created`
  const action = initialData ? 'Save changes' : 'Create'

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        description: '',
        image: '',
      }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/amenities/${params.amenityId}`, data)
      } else {
        await axios.post(`/api/amenities`, data)
      }
      router.refresh()
      router.push('/amenities')
      toast({ description: toastMessage })
    } catch (error: any) {
      console.log(error)
      toast({ variant: 'destructive', title: 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <Button
            variant='link'
            className='mb-10 px-0'
            size='sm'
            onClick={() => router.back()}
          >
            <ChevronLeftIcon className='w-6 h-6' /> Back
          </Button>
          <h1 className='tracking-tight text-3xl font-semibold'>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <Separator className='mt-2' />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mt-10 w-full space-y-10'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder='Description'
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className='mt-10'
            disabled={loading}
            type='submit'
            variant='blue'
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default EditForm
