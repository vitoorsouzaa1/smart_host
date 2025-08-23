import { prisma } from '@/lib/prisma'
import { PropertyCard } from '@/components/PropertyCard'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

// Separate data fetching function
async function getProperties() {
  try {
    const properties = await prisma.property.findMany({
      where: { isActive: true },
      include: {
        images: {
          orderBy: { createdAt: 'asc' }
        },
        amenities: {
          orderBy: { name: 'asc' }
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return properties.map(property => ({
      ...property,
      price: property.price.toString()
    }))
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

// Loading component
const PropertiesLoading = () => (
  <div className="container mx-auto py-10">
    <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse"></div>
      ))}
    </div>
  </div>
)

// Separate properties grid component
interface PropertiesGridProps {
  properties: any[]
}

const PropertiesGrid = ({ properties }: PropertiesGridProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">No Properties Found</h2>
        <p className="text-gray-500">There are no properties available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property}
          className="hover:scale-105 transition-transform duration-200"
        />
      ))}
    </div>
  )
}

// Main properties component
const PropertiesContent = async () => {
  const properties = await getProperties()
  
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Properties</h1>
        <p className="text-gray-600">
          Discover {properties.length} amazing properties for your next stay
        </p>
      </div>
      
      <PropertiesGrid properties={properties} />
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<PropertiesLoading />}>
      <PropertiesContent />
    </Suspense>
  )
}

// Add metadata
export const metadata = {
  title: 'Properties - SmartHost',
  description: 'Browse all available vacation rental properties on SmartHost.',
}