import { prisma } from '@/lib/prisma'
import { PropertyCard } from '@/components/PropertyCard'
import { Suspense } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

// Separate data fetching function
async function getProperties() {
  try {
    const properties = await prisma.property.findMany({
      where: { isActive: true },
      include: {
        images: {
          orderBy: { createdAt: 'asc' },
        },
        amenities: {
          orderBy: { name: 'asc' },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return properties.map((property) => ({
      ...property,
      price: property.price.toString(),
    }))
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

// Enhanced Loading component
const PropertiesLoading = () => (
  <div className='container mx-auto py-10'>
    {/* Header skeleton */}
    <div className='mb-8'>
      <div className='h-10 bg-gray-200 rounded w-80 mb-4 animate-pulse'></div>
      <div className='h-6 bg-gray-200 rounded w-96 animate-pulse'></div>
    </div>

    {/* Filters skeleton */}
    <Card className='mb-8'>
      <CardContent className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='h-10 bg-gray-200 rounded animate-pulse'></div>
          <div className='h-10 bg-gray-200 rounded animate-pulse'></div>
          <div className='h-10 bg-gray-200 rounded animate-pulse'></div>
          <div className='h-10 bg-gray-200 rounded animate-pulse'></div>
        </div>
      </CardContent>
    </Card>

    {/* Properties grid skeleton */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className='bg-gray-200 h-96 rounded-lg animate-pulse'
        ></div>
      ))}
    </div>
  </div>
)

// Enhanced Properties Grid component
interface PropertiesGridProps {
  properties: any[]
}

const PropertiesGrid = ({ properties }: PropertiesGridProps) => {
  if (properties.length === 0) {
    return (
      <div className='text-center py-16'>
        <div className='max-w-md mx-auto'>
          <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <svg
              className='w-12 h-12 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
            No Properties Found
          </h2>
          <p className='text-gray-600 mb-6'>
            There are no properties available that match your criteria. Try
            adjusting your filters or search terms.
          </p>
          <Button variant='outline'>Clear Filters</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Results summary */}
      <div className='flex justify-between items-center mb-6'>
        <p className='text-gray-600'>
          Showing <span className='font-semibold'>{properties.length}</span>{' '}
          properties
        </p>
        <div className='flex gap-2'>
          <Badge variant='secondary'>Sort: Newest</Badge>
        </div>
      </div>

      {/* Properties grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            className='hover:scale-[1.02] transition-all duration-200 hover:shadow-lg'
          />
        ))}
      </div>
    </>
  )
}

// Enhanced Filters Component
const PropertiesFilters = () => {
  return (
    <Card className='mb-8'>
      <CardContent className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Location
            </label>
            <Input placeholder='Search by city or country' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Price Range
            </label>
            <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
              <option value=''>Any Price</option>
              <option value='0-100'>$0 - $100</option>
              <option value='100-200'>$100 - $200</option>
              <option value='200-500'>$200 - $500</option>
              <option value='500+'>$500+</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Property Type
            </label>
            <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
              <option value=''>All Types</option>
              <option value='apartment'>Apartment</option>
              <option value='house'>House</option>
              <option value='villa'>Villa</option>
              <option value='condo'>Condo</option>
            </select>
          </div>
          <div className='flex items-end'>
            <Button className='w-full'>Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main properties component
const PropertiesContent = async () => {
  const properties = await getProperties()

  return (
    <div className='container mx-auto py-10'>
      {/* Enhanced Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Discover Amazing Properties
        </h1>
        <p className='text-xl text-gray-600'>
          Find your perfect stay from our collection of {properties.length}{' '}
          handpicked properties
        </p>
      </div>

      {/* Filters */}
      <PropertiesFilters />

      {/* Properties Grid */}
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
