import { useState, useCallback } from 'react'

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthFormOptions {
  onSuccess?: <T extends LoginFormData | RegisterFormData>(data: T) => void
  onError?: (error: string) => void
  validatePasswords?: boolean
}

export const useAuthForm = <T extends LoginFormData | RegisterFormData>(
  initialData: T,
  options: AuthFormOptions = {}
) => {
  const [formData, setFormData] = useState<T>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const updateField = useCallback(
    (field: keyof T, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    },
    [errors]
  )

  const validateForm = useCallback((): boolean => {
    // Criando um objeto de erros tipado que pode conter todas as chaves possíveis
    type AllFormFields = LoginFormData & RegisterFormData
    const newErrors: Partial<Record<keyof AllFormFields, string>> = {}

    // Email validation
    if ('email' in formData) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    // Password validation for registration
    if (
      options.validatePasswords &&
      'password' in formData &&
      'confirmPassword' in formData
    ) {
      const registerData = formData as RegisterFormData
      if (registerData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      if (registerData.password !== registerData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    // Name validation for registration
    if ('name' in formData && !formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Convertendo o objeto de erros para o tipo esperado pelo estado
    setErrors(newErrors as Partial<Record<keyof T, string>>)
    return Object.keys(newErrors).length === 0
  }, [formData, options.validatePasswords])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validateForm()) {
        return
      }

      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (options.onSuccess) {
          options.onSuccess(formData)
        } else {
          alert(
            'This is a demo. In a real application, this would authenticate the user.'
          )
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An error occurred'
        if (options.onError) {
          options.onError(errorMessage)
        } else {
          alert(errorMessage)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [formData, validateForm, options]
  )

  const resetForm = useCallback(() => {
    setFormData(initialData)
    setErrors({})
    setIsLoading(false)
  }, [initialData])

  return {
    formData,
    errors,
    isLoading,
    updateField,
    handleSubmit,
    resetForm,
    isValid: Object.keys(errors).length === 0,
  }
}
