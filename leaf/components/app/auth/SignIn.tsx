'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { GoogleIcon } from '@/components/icons/svg/GoogleIcon'

const formSchema = z.object({
  email: z.string().max(320).email(),
  password: z.string().min(8).max(32),
})

type SignInFormValues = z.infer<typeof formSchema>

const SignIn = () => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginWithGoogle = async () => {
    setLoading(true)

    try {
      await signIn('google')
      router.push('/')
      router.refresh()
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const loginWithCredentials = async (data: SignInFormValues) => {
    setLoading(true)

    try {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
      })
      router.push('/')
      router.refresh()
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response.data,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
        <p className='text-sm max-w-xs mx-auto'>All fields are required</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(loginWithCredentials)}>
          <div className='flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Email' {...field} />
                  </FormControl>
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
                      disabled={loading}
                      placeholder='Password'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              size='sm'
              className={cn(buttonVariants({ variant: 'teal' }), 'mt-4')}
            >
              Sign In
            </Button>
          </div>

          <div className='space-y-3 mt-4'>
            <Label>Login with Google</Label>
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
              Dont have an account?
              <Link
                href='/sign-up'
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'text-teal-600'
                )}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignIn
