'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Smartphone, Globe } from 'lucide-react'

type PaymentMethod = 'credit-card' | 'pix' | 'paypal'

interface PaymentData {
  method: PaymentMethod
  amount: number
  currency: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
  pixKey?: string
}

interface PaymentMethodsProps {
  amount: number
  currency?: string
  onPaymentSubmit?: (method: string, paymentData: any) => void
  onPaymentComplete?: (result: any) => void
  onPaymentError?: (error: string) => void
}

export function PaymentMethods({
  amount,
  currency = 'USD',
  onPaymentSubmit,
  onPaymentComplete,
  onPaymentError,
}: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>('credit-card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState<Partial<PaymentData>>({})

  const handlePayment = async () => {
    if (!selectedMethod || !amount) {
      onPaymentError?.('Missing payment information')
      return
    }

    setIsProcessing(true)

    try {
      // If onPaymentSubmit is provided, use it instead of direct API call
      if (onPaymentSubmit) {
        await onPaymentSubmit(selectedMethod, paymentData)
      } else {
        // Fallback to direct API call
        const response = await fetch('/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            method: selectedMethod,
            amount,
            currency,
            ...paymentData,
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Payment failed')
        }

        onPaymentComplete?.(result)
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Payment processing failed'
      onPaymentError?.(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-center'>Payment Methods</CardTitle>
        <div className='text-center'>
          <Badge variant='secondary' className='text-lg px-4 py-2'>
            {currency} {amount.toFixed(2)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Payment Method Selection */}
        <div className='grid grid-cols-3 gap-2'>
          <Button
            variant={selectedMethod === 'credit-card' ? 'default' : 'outline'}
            onClick={() => setSelectedMethod('credit-card')}
            className='flex flex-col items-center p-4 h-auto'
          >
            <CreditCard className='h-6 w-6 mb-2' />
            <span className='text-xs'>Card</span>
          </Button>
          <Button
            variant={selectedMethod === 'pix' ? 'default' : 'outline'}
            onClick={() => setSelectedMethod('pix')}
            className='flex flex-col items-center p-4 h-auto'
          >
            <Smartphone className='h-6 w-6 mb-2' />
            <span className='text-xs'>PIX</span>
          </Button>
          <Button
            variant={selectedMethod === 'paypal' ? 'default' : 'outline'}
            onClick={() => setSelectedMethod('paypal')}
            className='flex flex-col items-center p-4 h-auto'
          >
            <Globe className='h-6 w-6 mb-2' />
            <span className='text-xs'>PayPal</span>
          </Button>
        </div>

        <Separator />

        {/* Payment Forms */}
        {selectedMethod === 'credit-card' && (
          <CreditCardForm
            onSubmit={handlePayment}
            isProcessing={isProcessing}
          />
        )}
        {selectedMethod === 'pix' && (
          <PixForm
            onSubmit={handlePayment}
            isProcessing={isProcessing}
            amount={amount}
          />
        )}
        {selectedMethod === 'paypal' && (
          <PayPalForm onSubmit={handlePayment} isProcessing={isProcessing} />
        )}
      </CardContent>
    </Card>
  )
}

// Credit Card Form Component
function CreditCardForm({
  onSubmit,
  isProcessing,
}: {
  onSubmit: (data: any) => void
  isProcessing: boolean
}) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Label htmlFor='cardholderName'>Cardholder Name</Label>
        <Input
          id='cardholderName'
          value={formData.cardholderName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, cardholderName: e.target.value }))
          }
          placeholder='John Doe'
          required
        />
      </div>
      <div>
        <Label htmlFor='cardNumber'>Card Number</Label>
        <Input
          id='cardNumber'
          value={formData.cardNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, cardNumber: e.target.value }))
          }
          placeholder='1234 5678 9012 3456'
          maxLength={19}
          required
        />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='expiryDate'>Expiry Date</Label>
          <Input
            id='expiryDate'
            value={formData.expiryDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))
            }
            placeholder='MM/YY'
            maxLength={5}
            required
          />
        </div>
        <div>
          <Label htmlFor='cvv'>CVV</Label>
          <Input
            id='cvv'
            value={formData.cvv}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, cvv: e.target.value }))
            }
            placeholder='123'
            maxLength={4}
            required
          />
        </div>
      </div>
      <Button type='submit' className='w-full' disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay with Card'}
      </Button>
    </form>
  )
}

// PIX Form Component
function PixForm({
  onSubmit,
  isProcessing,
  amount,
}: {
  onSubmit: (data: any) => void
  isProcessing: boolean
  amount: number
}) {
  const [pixKey, setPixKey] = useState('')
  const [qrCode] = useState(`pix-qr-${Date.now()}`) // Simulated QR code

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ pixKey, qrCode, amount })
  }

  return (
    <div className='space-y-4'>
      <div className='text-center p-6 border-2 border-dashed border-gray-300 rounded-lg'>
        <Smartphone className='h-12 w-12 mx-auto mb-4 text-gray-400' />
        <p className='text-sm text-gray-600 mb-2'>
          Scan QR Code with your PIX app
        </p>
        <div className='bg-gray-100 p-4 rounded text-xs font-mono'>
          QR Code: {qrCode}
        </div>
      </div>

      <div className='text-center text-sm text-gray-500'>
        <span>or</span>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Label htmlFor='pixKey'>PIX Key (Optional)</Label>
          <Input
            id='pixKey'
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            placeholder='your-pix-key@email.com'
          />
        </div>
        <Button type='submit' className='w-full' disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Confirm PIX Payment'}
        </Button>
      </form>
    </div>
  )
}

// PayPal Form Component
function PayPalForm({
  onSubmit,
  isProcessing,
}: {
  onSubmit: (data: any) => void
  isProcessing: boolean
}) {
  const handlePayPalClick = () => {
    // In a real implementation, this would redirect to PayPal
    onSubmit({ method: 'paypal', redirectUrl: 'https://paypal.com/checkout' })
  }

  return (
    <div className='space-y-4 text-center'>
      <div className='p-6 border border-gray-200 rounded-lg'>
        <Globe className='h-12 w-12 mx-auto mb-4 text-blue-600' />
        <p className='text-sm text-gray-600 mb-4'>
          You will be redirected to PayPal to complete your payment securely.
        </p>
      </div>
      <Button
        onClick={handlePayPalClick}
        className='w-full bg-blue-600 hover:bg-blue-700'
        disabled={isProcessing}
      >
        {isProcessing ? 'Redirecting...' : 'Continue with PayPal'}
      </Button>
    </div>
  )
}
