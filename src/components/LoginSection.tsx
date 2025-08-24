'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormInput } from '@/components/ui/FormInput'
import { SocialButton } from '@/components/ui/SocialButton'
import { Divider } from '@/components/ui/divider'
import { useAuthForm, type LoginFormData } from '@/hooks/useAuthForm'
import { useAnimation } from '@/hooks/useAnimation'
import Link from 'next/link'

const initialLoginData: LoginFormData = {
  email: '',
  password: '',
}

export function LoginSection() {
  const isVisible = useAnimation(100)
  const { formData, errors, isLoading, updateField, handleSubmit } =
    useAuthForm(initialLoginData, {
      onSuccess: (data) => {
        console.log('Login successful:', data)
        // Handle successful login (redirect, etc.)
      },
    })

  const handleSocialLogin = (provider: 'google' | 'twitter') => {
    console.log(`Login with ${provider}`)
    // Handle social login
  }

  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <div
        className={`w-full max-w-md transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <Card className='shadow-lg border-t-4 border-t-blue-500 hover:shadow-xl transition-shadow duration-300'>
          <CardHeader className='text-center space-y-2'>
            <CardTitle className='text-3xl font-bold tracking-tight'>
              Sign In
            </CardTitle>
            <CardDescription className='text-gray-600'>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <FormInput
                id='email'
                label='Email'
                type='email'
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={errors.email}
                required
                autoComplete='email'
              />

              <FormInput
                id='password'
                label='Password'
                type='password'
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                error={errors.password}
                required
                autoComplete='current-password'
              />

              <div className='flex justify-end'>
                <Link
                  href='/forgot-password'
                  className='text-sm text-blue-600 hover:underline'
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type='submit'
                className='w-full'
                size='lg'
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <Divider text='Or continue with' />

            <div className='grid grid-cols-2 gap-3'>
              <SocialButton
                provider='google'
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
              />
              <SocialButton
                provider='twitter'
                onClick={() => handleSocialLogin('twitter')}
                disabled={isLoading}
              />
            </div>
          </CardContent>

          <CardFooter className='flex justify-center border-t pt-6'>
            <p className='text-sm text-gray-600'>
              Don't have an account?{' '}
              <Link
                href='/register'
                className='text-blue-600 hover:underline font-medium'
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
