'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card'
import { PropertyImage } from './ui/PropertyImage'
import { AmenitiesList } from './ui/AmenitiesList'
import { usePropertyCard, type Property } from '@/hooks/usePropertyCard'

type PropertyCardProps = {
  property: Property
  className?: string
}

export function PropertyCard({ property, className = '' }: PropertyCardProps) {
  const {
    formattedPrice,
    primaryImage,
    displayAmenities,
    locationText,
    truncatedDescription,
    propertyUrl,
  } = usePropertyCard({ property })

  return (
    <Card className={`overflow-hidden h-full flex flex-col ${className}`}>
      <PropertyImage image={primaryImage} title={property.title} />
      <CardHeader>
        <CardTitle className='line-clamp-1'>{property.title}</CardTitle>
        <CardDescription>{locationText}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='font-bold text-xl text-blue-600 mb-2'>{formattedPrice} <span className="text-sm text-gray-500 font-normal">per night</span></p>
        <p className='text-gray-600 mt-2 line-clamp-2 mb-4'>
          {truncatedDescription}
        </p>
        <AmenitiesList
          visible={displayAmenities.visible}
          remaining={displayAmenities.remaining}
          hasMore={displayAmenities.hasMore}
        />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant='outline' className='flex-1'>
          <Link href={propertyUrl}>View Details</Link>
        </Button>
        <Button asChild className='flex-1'>
          <Link href={`/booking/${property.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
