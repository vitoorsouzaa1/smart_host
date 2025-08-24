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
      <div className='space-y-1'>
        <Label
          htmlFor={props.id}
          className='block text-sm font-medium text-gray-700'
        >
          {label}
        </Label>
        <Input
          ref={ref}
          className={cn(
            'w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all',
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300',
            className
          )}
          {...props}
        />
        {error && <p className='text-sm text-red-600 mt-1'>{error}</p>}
        {helperText && !error && (
          <p className='text-sm text-gray-500 mt-1'>{helperText}</p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
