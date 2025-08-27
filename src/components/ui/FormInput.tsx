import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className='space-y-2'>
        <Label
          htmlFor={props.id}
          className='block text-sm font-semibold text-gray-700 mb-1'
        >
          {label}
        </Label>
        <Input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400',
            error
              ? 'border-red-300 focus:ring-red-500 bg-red-50 hover:border-red-400'
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className='text-sm text-red-600 flex items-center gap-1 mt-1'>
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className='text-sm text-gray-500 mt-1'>{helperText}</p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
