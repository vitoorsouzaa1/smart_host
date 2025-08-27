import { prisma } from '@/lib/prisma'
import { HeroSection } from '@/components/HeroSection'
import { FeaturedSection } from '@/components/FeaturedSection'
import { Suspense } from 'react'

// Enhanced data fetching with better error handling
async function getFeaturedProperties() {
  try {
    const properties = await prisma.property.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      include: {
        images: {
          take: 1,
          orderBy: { createdAt: 'asc' },
        },
        amenities: {
          take: 5,
          orderBy: { name: 'asc' },
        },
        owner: {
          select: { name: true },
        },
      },
      take: 8,
      orderBy: { createdAt: 'desc' },
    })

    // Convert Decimal to string to avoid serialization issues
    return properties.map((property) => ({
      ...property,
      price: property.price.toString(),
    }))
  } catch (error) {
    console.error('Error fetching featured properties:', error)
    // Return empty array instead of throwing to prevent page crash
    return []
  }
}

// Add error boundary for featured properties
function FeaturedPropertiesWithErrorBoundary() {
  return (
    <Suspense fallback={<FeaturedPropertiesLoading />}>
      <FeaturedPropertiesSection />
    </Suspense>
  )
}

// Loading component
const FeaturedPropertiesLoading = () => (
  <div className='mb-16'>
    <div className='mb-8'>
      <div className='h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse'></div>
      <div className='h-4 bg-gray-200 rounded w-96 animate-pulse'></div>
    </div>
    <div className='flex gap-6 overflow-hidden'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className='min-w-[280px] bg-gray-200 h-96 rounded-lg animate-pulse'
        ></div>
      ))}
    </div>
  </div>
)

// Separate featured properties component
const FeaturedPropertiesSection = async () => {
  const featuredProperties = await getFeaturedProperties()
  return <FeaturedSection properties={featuredProperties} />
}

export default function Home() {
  return (
    <div className='container mx-auto py-16 px-4'>
      <HeroSection />

      <Suspense fallback={<FeaturedPropertiesLoading />}>
        <FeaturedPropertiesSection />
      </Suspense>
    </div>
  )
}

// Add metadata
export const metadata: import('next').Metadata = {
  title: 'SmartHost - Find Your Perfect Vacation Rental',
  description:
    'Discover amazing properties for your next trip. Book with confidence and enjoy unforgettable stays around the world.',
}
