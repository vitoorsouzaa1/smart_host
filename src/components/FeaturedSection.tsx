'use client'

import { PropertyCard } from './PropertyCard'
import { CarouselControls } from './ui/CarouselControls'
import { useCarousel } from '@/hooks/useCarousel'
import { type Property } from '@/hooks/usePropertyCard'

type FeaturedSectionProps = {
  properties: Property[]
}

function SectionHeader() {
  return (
    <div className='mb-8'>
      <div className='sticky top-0 z-10 bg-white pt-8 pb-4'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-3xl font-bold text-gray-900'>
            Featured Properties
          </h2>
        </div>
      </div>
      <p className='text-gray-600 mb-4'>
        Discover our most popular vacation rentals
      </p>
    </div>
  )
}

export function FeaturedSection({ properties }: FeaturedSectionProps) {
  const {
    carouselRef,
    currentSlide,
    totalSlides,
    scrollToSlide,
    handleScroll,
  } = useCarousel({
    itemCount: properties.length,
    autoScrollInterval: 5000,
    enableAutoScroll: true,
  })

  return (
    <div className='mb-16'>
      <SectionHeader />
      <div
        ref={carouselRef}
        className='flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={handleScroll}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {properties.map((property) => (
          <div
            key={property.id}
            className='min-w-[280px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] snap-start'
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
      <CarouselControls
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSlideClick={scrollToSlide}
      />
    </div>
  )
}
