import { useMemo } from 'react'

export type PropertyImage = {
  id: string
  url: string
  caption?: string | null
}

export type Amenity = {
  id: string
  name: string
  icon?: string | null
}

export type Property = {
  id: string
  title: string
  description: string
  price: number | string
  city: string
  country: string
  images: PropertyImage[]
  amenities: Amenity[]
}

export interface UsePropertyCardProps {
  property: Property
}

export const usePropertyCard = ({ property }: UsePropertyCardProps) => {
  const formattedPrice = useMemo(() => {
    return typeof property.price === 'number'
      ? `$${property.price.toFixed(2)}`
      : `$${property.price}`
  }, [property.price])

  const primaryImage = useMemo(() => {
    return property.images?.[0] || null
  }, [property.images])

  const displayAmenities = useMemo(() => {
    const maxDisplay = 3
    const visible = property.amenities?.slice(0, maxDisplay) || []
    const remaining = Math.max(
      0,
      (property.amenities?.length || 0) - maxDisplay
    )

    return {
      visible,
      remaining,
      hasMore: remaining > 0,
    }
  }, [property.amenities])

  const locationText = useMemo(() => {
    return `${property.city}, ${property.country}`
  }, [property.city, property.country])

  const truncatedDescription = useMemo(() => {
    const maxLength = 120
    return property.description.length > maxLength
      ? `${property.description.substring(0, maxLength)}...`
      : property.description
  }, [property.description])

  return {
    formattedPrice,
    primaryImage,
    displayAmenities,
    locationText,
    truncatedDescription,
    propertyUrl: `/properties/${property.id}`,
  }
}
