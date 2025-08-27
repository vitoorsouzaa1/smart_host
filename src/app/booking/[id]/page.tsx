'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PaymentMethods } from '@/components/PaymentMethods'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Property {
  id: string
  title: string
  price: number
  image: string
  location: string
}

interface PaymentMethodsProps {
  amount: number
  currency: string
  onPaymentComplete?: (result: any) => void
  onPaymentError?: (error: string) => void
}

export default function BookingPage() {
  const params = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    nights: 1,
  })
  const [showPayment, setShowPayment] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch property details
    fetchProperty(params.id as string)
  }, [params.id])

  const fetchProperty = async (id: string) => {
    try {
      // Mock property data - in real app, fetch from API
      setProperty({
        id,
        title: 'Beautiful Oceanview Villa',
        price: 250,
        image: '/placeholder-property.jpg',
        location: 'Malibu, CA',
      })
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching property:', error)
      setIsLoading(false)
    }
  }

  const handlePaymentSubmit = async (method: string, paymentData: any) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method,
          amount: calculateTotal(),
          currency: 'USD',
          propertyId: property?.id,
          bookingDetails,
          ...paymentData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl
        } else {
          // Handle successful payment
          alert('Payment successful! Booking confirmed.')
        }
      } else {
        alert('Payment failed: ' + result.error)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment processing failed. Please try again.')
    }
  }

  const calculateTotal = () => {
    if (!property) return 0
    return property.price * bookingDetails.nights
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Loading...
      </div>
    )
  }

  if (!property) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Property not found
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid md:grid-cols-2 gap-8'>
        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle>{property.title}</CardTitle>
            <p className='text-gray-600'>{property.location}</p>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='aspect-video bg-gray-200 rounded-lg flex items-center justify-center'>
                <span className='text-gray-500'>Property Image</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-2xl font-bold'>
                  ${property.price}/night
                </span>
                <Badge variant='secondary'>
                  {bookingDetails.nights} nights
                </Badge>
              </div>
              <div className='border-t pt-4'>
                <div className='flex justify-between'>
                  <span>Subtotal:</span>
                  <span>${property.price * bookingDetails.nights}</span>
                </div>
                <div className='flex justify-between font-bold text-lg'>
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Section */}
        <div>
          {!showPayment ? (
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    Check-in Date
                  </label>
                  <input
                    type='date'
                    value={bookingDetails.checkIn}
                    onChange={(e) =>
                      setBookingDetails((prev) => ({
                        ...prev,
                        checkIn: e.target.value,
                      }))
                    }
                    className='w-full p-2 border rounded'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    Check-out Date
                  </label>
                  <input
                    type='date'
                    value={bookingDetails.checkOut}
                    onChange={(e) =>
                      setBookingDetails((prev) => ({
                        ...prev,
                        checkOut: e.target.value,
                      }))
                    }
                    className='w-full p-2 border rounded'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    Number of Guests
                  </label>
                  <select
                    value={bookingDetails.guests}
                    onChange={(e) =>
                      setBookingDetails((prev) => ({
                        ...prev,
                        guests: parseInt(e.target.value),
                      }))
                    }
                    className='w-full p-2 border rounded'
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} Guest{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  onClick={() => setShowPayment(true)}
                  className='w-full'
                  disabled={!bookingDetails.checkIn || !bookingDetails.checkOut}
                >
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <PaymentMethods
              onPaymentSubmit={handlePaymentSubmit}
              amount={calculateTotal()}
              currency='USD'
            />
          )}
        </div>
      </div>
    </div>
  )
}
