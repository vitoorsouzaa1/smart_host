'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DatePicker } from '@/components/ui/DatePicker'
import { useSearchForm } from '@/hooks/useSearchForm'

// Separate input component for better reusability
interface SearchInputProps {
  id: string
  label: string
  type: 'text' | 'date'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}

const SearchInput = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}: SearchInputProps) => {
  if (type === 'date') {
    return (
      <DatePicker
        id={id}
        label={label}
        value={value ? new Date(value) : undefined}
        onChange={(date) =>
          onChange(date ? date.toISOString().split('T')[0] : '')
        }
        placeholder={placeholder}
        minDate={new Date()} // Prevent past dates
      />
    )
  }

  return (
    <div className='flex-1'>
      <label
        htmlFor={id}
        className='block text-sm font-medium text-gray-700 mb-2'
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500'
        required={required}
      />
    </div>
  )
}

export function SearchHero() {
  const { searchData, isLoading, updateField, handleSubmit } = useSearchForm()

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <div className='w-full max-w-4xl mx-auto mb-16'>
      <Card className='shadow-xl border-0 bg-white/95 backdrop-blur-sm'>
        <CardContent className='p-6'>
          <form
            onSubmit={onFormSubmit}
            className='flex flex-col md:flex-row gap-4 items-end'
          >
            <SearchInput
              id='location'
              label='Where'
              type='text'
              placeholder='Search destinations'
              value={searchData.location}
              onChange={(value) => updateField('location', value)}
              required
            />

            <SearchInput
              id='checkIn'
              label='Check-in'
              type='date'
              value={searchData.checkIn}
              onChange={(value) => updateField('checkIn', value)}
              required
            />

            <SearchInput
              id='checkOut'
              label='Check-out'
              type='date'
              value={searchData.checkOut}
              onChange={(value) => updateField('checkOut', value)}
              required
            />

            <div className='flex-shrink-0'>
              <Button
                type='submit'
                size='lg'
                disabled={isLoading}
                className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
