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
}

export function PropertyCard({ property }: PropertyCardProps) {
  const {
    formattedPrice,
    primaryImage,
    displayAmenities,
    locationText,
    truncatedDescription,
    propertyUrl,
  } = usePropertyCard({ property })

  return (
    <Card className='overflow-hidden h-full flex flex-col'>
      <PropertyImage image={primaryImage} title={property.title} />
      <CardHeader>
        <CardTitle className='line-clamp-1'>{property.title}</CardTitle>
        <CardDescription>{locationText}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='font-medium text-lg'>{formattedPrice} per night</p>
        <p className='text-gray-600 mt-2 line-clamp-2'>
          {truncatedDescription}
        </p>
        <AmenitiesList
          visible={displayAmenities.visible}
          remaining={displayAmenities.remaining}
          hasMore={displayAmenities.hasMore}
        />
      </CardContent>
      <CardFooter>
        <Button asChild variant='outline' className='w-full'>
          <Link href={propertyUrl}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
