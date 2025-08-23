import { type Amenity } from '@/hooks/usePropertyCard'

interface AmenitiesListProps {
  visible: Amenity[]
  remaining: number
  hasMore: boolean
  className?: string
}

export function AmenitiesList({ 
  visible, 
  remaining, 
  hasMore, 
  className = "flex flex-wrap gap-2 mt-4" 
}: AmenitiesListProps) {
  if (visible.length === 0) {
    return null
  }

  return (
    <div className={className}>
      {visible.map((amenity) => (
        <span 
          key={amenity.id} 
          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
        >
          {amenity.name}
        </span>
      ))}
      {hasMore && (
        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
          +{remaining} more
        </span>
      )}
    </div>
  )
}