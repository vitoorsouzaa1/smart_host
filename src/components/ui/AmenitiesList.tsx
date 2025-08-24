import { Badge } from '@/components/ui/badge'
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
        <Badge 
          key={amenity.id} 
          variant="secondary"
          className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
        >
          {amenity.name}
        </Badge>
      ))}
      {hasMore && (
        <Badge 
          variant="outline"
          className="bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 transition-colors"
        >
          +{remaining} more
        </Badge>
      )}
    </div>
  )
}