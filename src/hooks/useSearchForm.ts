import { useState, useEffect } from 'react'

export interface SearchFormData {
  location: string
  checkIn: string
  checkOut: string
}

export const useSearchForm = () => {
  const [searchData, setSearchData] = useState<SearchFormData>({
    location: '',
    checkIn: '',
    checkOut: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  // Initialize dates on mount
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0]
    }

    setSearchData(prev => ({
      ...prev,
      checkIn: formatDate(today),
      checkOut: formatDate(tomorrow),
    }))
  }, [])

  const updateField = (field: keyof SearchFormData, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (onSearch?: (data: SearchFormData) => void) => {
    if (!searchData.location.trim()) {
      alert('Please enter a location')
      return
    }

    setIsLoading(true)
    
    try {
      // Custom search handler or default behavior
      if (onSearch) {
        await onSearch(searchData)
      } else {
        console.log('Search data:', searchData)
        alert(
          `Searching for properties in ${searchData.location} from ${searchData.checkIn} to ${searchData.checkOut}`
        )
      }
    } catch (error) {
      console.error('Search error:', error)
      alert('Search failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setSearchData({
      location: '',
      checkIn: '',
      checkOut: '',
    })
  }

  return {
    searchData,
    isLoading,
    updateField,
    handleSubmit,
    resetForm,
  }
}