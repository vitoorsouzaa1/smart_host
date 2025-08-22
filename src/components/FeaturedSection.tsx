'use client'

import { useState, useRef, useEffect } from 'react'
import { PropertyCard } from './PropertyCard'
import { Button } from './ui/button'

type Property = {
  id: string
  title: string
  description: string
  price: number | string
  city: string
  country: string
  images: Array<{
    id: string
    url: string
    caption?: string | null
  }>
  amenities: Array<{
    id: string
    name: string
    icon?: string | null
  }>
}

type FeaturedSectionProps = {
  properties: Property[]
}

export function FeaturedSection({ properties }: FeaturedSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [visibleCards, setVisibleCards] = useState(4)

  // Define scroll functions before useEffect hooks that use them
  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth / visibleCards
      const newPosition = Math.max(scrollPosition - cardWidth, 0)
      carouselRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth / visibleCards
      const newPosition = Math.min(scrollPosition + cardWidth, maxScroll)
      carouselRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }

  useEffect(() => {
    const updateMaxScroll = () => {
      if (carouselRef.current) {
        setMaxScroll(
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth
        )

        // Determine visible cards based on screen width
        if (window.innerWidth >= 1280) {
          // xl breakpoint
          setVisibleCards(4)
        } else if (window.innerWidth >= 768) {
          // md breakpoint
          setVisibleCards(2)
        } else {
          setVisibleCards(1)
        }
      }
    }

    updateMaxScroll()
    window.addEventListener('resize', updateMaxScroll)
    return () => window.removeEventListener('resize', updateMaxScroll)
  }, [properties])

  // Auto-scroll functionality
  useEffect(() => {
    let autoScrollInterval: NodeJS.Timeout

    // Only auto-scroll if there are enough properties and user isn't interacting
    const startAutoScroll = () => {
      if (properties.length > visibleCards) {
        autoScrollInterval = setInterval(() => {
          if (scrollPosition >= maxScroll) {
            // Reset to beginning when reaching the end
            if (carouselRef.current) {
              carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
              setScrollPosition(0)
            }
          } else {
            // Scroll to next card
            scrollRight()
          }
        }, 5000) // Auto-scroll every 5 seconds
      }
    }

    startAutoScroll()

    // Pause auto-scroll when user interacts with carousel
    const pauseAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval)
      }
    }

    // Resume auto-scroll after user interaction ends
    const resumeAutoScroll = () => {
      pauseAutoScroll()
      startAutoScroll()
    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('mouseenter', pauseAutoScroll)
      carousel.addEventListener('mouseleave', resumeAutoScroll)
      carousel.addEventListener('touchstart', pauseAutoScroll)
      carousel.addEventListener('touchend', resumeAutoScroll)
    }

    return () => {
      pauseAutoScroll()
      if (carousel) {
        carousel.removeEventListener('mouseenter', pauseAutoScroll)
        carousel.removeEventListener('mouseleave', resumeAutoScroll)
        carousel.removeEventListener('touchstart', pauseAutoScroll)
        carousel.removeEventListener('touchend', resumeAutoScroll)
      }
    }
  }, [properties.length, visibleCards, scrollPosition, maxScroll])

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft)
    }
  }

  return (
    <div className='mb-16'>
      <div className='mb-8'>
        <div className='sticky top-0 z-10 bg-white pt-8 pb-4'>
          <div className='flex justify-between items-center mb-2'>
            {/* Header content */}
          </div>
        </div>
        <p className='text-gray-600 mb-4'>
          Discover our most popular vacation rentals
        </p>
      </div>
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
            <PropertyCard
              id={property.id}
              title={property.title}
              description={property.description}
              price={property.price}
              city={property.city}
              country={property.country}
              images={property.images}
              amenities={property.amenities}
            />
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-6 gap-1'>
        {Array.from({
          length: Math.ceil(properties.length / visibleCards),
        }).map((_, index) => {
          const isActive =
            index ===
            Math.floor(
              ((scrollPosition / (carouselRef.current?.clientWidth || 1)) *
                Math.ceil(properties.length / visibleCards)) /
                properties.length
            )
          return (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                isActive ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => {
                if (carouselRef.current) {
                  const newPosition =
                    (carouselRef.current.scrollWidth /
                      Math.ceil(properties.length / visibleCards)) *
                    index
                  carouselRef.current.scrollTo({
                    left: newPosition,
                    behavior: 'smooth',
                  })
                  setScrollPosition(newPosition)
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}
