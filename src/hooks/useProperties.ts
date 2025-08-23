import { useMemo } from 'react'
import { type Property } from './usePropertyCard'

export interface PropertyFilters {
  search?: string
  minPrice?: number
  maxPrice?: number
  amenities?: string[]
  city?: string
}

export const useProperties = (
  properties: Property[],
  filters: PropertyFilters = {}
) => {
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesSearch =
          property.title.toLowerCase().includes(searchTerm) ||
          property.description.toLowerCase().includes(searchTerm) ||
          property.city.toLowerCase().includes(searchTerm) ||
          property.country.toLowerCase().includes(searchTerm)

        if (!matchesSearch) return false
      }

      // Price filters
      const price =
        typeof property.price === 'string'
          ? parseFloat(property.price)
          : property.price
      if (filters.minPrice && price < filters.minPrice) return false
      if (filters.maxPrice && price > filters.maxPrice) return false

      // City filter
      if (
        filters.city &&
        property.city.toLowerCase() !== filters.city.toLowerCase()
      ) {
        return false
      }

      // Amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        const propertyAmenities =
          property.amenities?.map((a) => a.name.toLowerCase()) || []
        const hasRequiredAmenities = filters.amenities.every((amenity) =>
          propertyAmenities.includes(amenity.toLowerCase())
        )
        if (!hasRequiredAmenities) return false
      }

      return true
    })
  }, [properties, filters])

  const stats = useMemo(() => {
    const prices = filteredProperties.map((p) =>
      typeof p.price === 'string' ? parseFloat(p.price) : p.price
    )

    return {
      total: filteredProperties.length,
      minPrice: prices.length > 0 ? Math.min(...prices) : 0,
      maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
      avgPrice:
        prices.length > 0
          ? prices.reduce((a, b) => a + b, 0) / prices.length
          : 0,
    }
  }, [filteredProperties])

  return {
    properties: filteredProperties,
    stats,
  }
}
