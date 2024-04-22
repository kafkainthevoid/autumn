'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { GoogleIcon } from '@/components/icons/svg/GoogleIcon'
import axios from '@/lib/axios'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

interface SignUpProps {}

const formSchema = z
  .object({
    firstName: z.string().min(3, 'Firstname must be atleast 3 characters'),
    lastName: z.string().min(3, 'Lastname must be atleast 3 characters'),
    phoneNumber: z.string().regex(phoneRegExp, 'Invalid phone number'),
    address: z.string().min(3, 'Incorrect address').max(254),
    email: z.string().max(320).email({ message: 'Not a valid email' }),
    password: z
      .string()
      .min(8, 'Password must be atleast 8 characters')
      .max(32),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password don't match",
  })

type SignUpFormValues = z.infer<typeof formSchema>

const SignUp: FC<SignUpProps> = ({}) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const loginWithGoogle = async () => {
    setLoading(true)

    try {
      await signIn('google')
      router.push('/')
      router.refresh()
    } catch (err) {
      console.log(err)
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setLoading(true)
      console.log(data)
      await axios.post('/api/register', {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
      })

      router.push('/sign-in')
      router.refresh()
    } catch (err: any) {
      console.log(err)
      toast({
        variant: 'destructive',
        description: 'Something went wrong, please try again',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 '>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Create new Account
        </h1>
        <p className='text-sm max-w-xs mx-auto'>All fields are required</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='First name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Last name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Nummber</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Phone number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      disabled={loading}
                      placeholder='Password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ul className='list-disc ml-8 text-xs mt-2 text-zinc-800'>
              <li>Must be between 8 and 32 characters</li>
              <li>Contain one uppercase letter</li>
              <li>Contain one lowercase letter</li>
              <li>One number (0-9) or one special character</li>
            </ul>

            <FormField
              control={form.control}
              name='passwordConfirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirm</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      disabled={loading}
                      placeholder='Password confirm'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              size='sm'
              className={cn(buttonVariants({ variant: 'teal' }), 'col-span-4')}
              type='submit'
            >
              Create
            </Button>
          </div>
        </form>
      </Form>

      <Label className='mt-4'>Login with Google</Label>
      <Button
        disabled={loading}
        size='sm'
        className='w-full text-teal-600 bg-white border-2 border-teal-600 hover:bg-zinc-200'
        onClick={() => loginWithGoogle()}
      >
        {loading ? null : <GoogleIcon className='w-6 h-6 mr-2' />}
        Google
      </Button>

      <p className='px-8 text-center text-sm text-muted-foreground'>
        Already have an account?{' '}
        <Link
          href='/sign-in'
          className={cn(buttonVariants({ variant: 'link' }), 'text-teal-600')}
        >
          Login
        </Link>
      </p>
    </div>
  )
}

export default SignUp
