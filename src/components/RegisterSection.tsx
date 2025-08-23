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
import { useAuthForm, type RegisterFormData } from '@/hooks/useAuthForm'
import { useAnimation } from '@/hooks/useAnimation'
import Link from 'next/link'
import { useState } from 'react'

const initialRegisterData: RegisterFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

// Separate checkbox component
interface CheckboxProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  children: React.ReactNode
  required?: boolean
}

const Checkbox = ({
  id,
  checked,
  onChange,
  children,
  required,
}: CheckboxProps) => (
  <div className='flex items-start'>
    <input
      id={id}
      type='checkbox'
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1'
      required={required}
    />
    <label htmlFor={id} className='ml-2 block text-sm text-gray-900 leading-5'>
      {children}
    </label>
  </div>
)

// Separate divider component
const Divider = ({ text }: { text: string }) => (
  <div className='relative my-6'>
    <div className='absolute inset-0 flex items-center'>
      <div className='w-full border-t border-gray-300'></div>
    </div>
    <div className='relative flex justify-center text-sm'>
      <span className='px-2 bg-white text-gray-500'>{text}</span>
    </div>
  </div>
)

export function RegisterSection() {
  const isVisible = useAnimation(100)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const { formData, errors, isLoading, updateField, handleSubmit } =
    useAuthForm(initialRegisterData, {
      validatePasswords: true,
      onSuccess: (data) => {
        console.log('Registration successful:', data)
        // Handle successful registration (redirect, etc.)
      },
    })

  const handleSocialSignup = (provider: 'google' | 'twitter') => {
    console.log(`Sign up with ${provider}`)
    // Handle social signup
  }

  const onFormSubmit = (e: React.FormEvent) => {
    if (!acceptedTerms) {
      alert('Please accept the terms and conditions')
      return
    }
    handleSubmit(e)
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
              Create Account
            </CardTitle>
            <CardDescription className='text-gray-600'>
              Join SmartHost and start your hosting journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={onFormSubmit} className='space-y-4'>
              <FormInput
                id='name'
                label='Full Name'
                type='text'
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                error={errors.name}
                required
                autoComplete='name'
              />

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
                helperText='Must be at least 6 characters'
                required
                minLength={6}
                autoComplete='new-password'
              />

              <FormInput
                id='confirmPassword'
                label='Confirm Password'
                type='password'
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                required
                minLength={6}
                autoComplete='new-password'
              />

              <Checkbox
                id='terms'
                checked={acceptedTerms}
                onChange={setAcceptedTerms}
                required
              >
                I agree to the{' '}
                <Link href='/terms' className='text-blue-600 hover:underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href='/privacy' className='text-blue-600 hover:underline'>
                  Privacy Policy
                </Link>
              </Checkbox>

              <Button
                type='submit'
                className='w-full'
                size='lg'
                disabled={isLoading || !acceptedTerms}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <Divider text='Or sign up with' />

            <div className='grid grid-cols-2 gap-3'>
              <SocialButton
                provider='google'
                onClick={() => handleSocialSignup('google')}
                disabled={isLoading}
              />
              <SocialButton
                provider='twitter'
                onClick={() => handleSocialSignup('twitter')}
                disabled={isLoading}
              />
            </div>
          </CardContent>

          <CardFooter className='flex justify-center border-t pt-6'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='text-blue-600 hover:underline font-medium'
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
