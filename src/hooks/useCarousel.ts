import { useState, useRef, useEffect, useCallback } from 'react'

export interface UseCarouselProps {
  itemCount: number
  autoScrollInterval?: number
  enableAutoScroll?: boolean
}

export const useCarousel = ({
  itemCount,
  autoScrollInterval = 5000,
  enableAutoScroll = true,
}: UseCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [visibleCards, setVisibleCards] = useState(4)
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  const updateVisibleCards = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) {
        setVisibleCards(4)
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2)
      } else {
        setVisibleCards(1)
      }
    }
  }, [])

  const updateMaxScroll = useCallback(() => {
    if (carouselRef.current) {
      setMaxScroll(
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth
      )
    }
  }, [])

  const scrollTo = useCallback((position: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: position, behavior: 'smooth' })
      setScrollPosition(position)
    }
  }, [])

  const scrollLeft = useCallback(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth / visibleCards
      const newPosition = Math.max(scrollPosition - cardWidth, 0)
      scrollTo(newPosition)
    }
  }, [scrollPosition, visibleCards, scrollTo])

  const scrollRight = useCallback(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth / visibleCards
      const newPosition = Math.min(scrollPosition + cardWidth, maxScroll)
      scrollTo(newPosition)
    }
  }, [scrollPosition, visibleCards, maxScroll, scrollTo])

  const scrollToSlide = useCallback(
    (slideIndex: number) => {
      if (carouselRef.current) {
        const totalSlides = Math.ceil(itemCount / visibleCards)
        const newPosition =
          (carouselRef.current.scrollWidth / totalSlides) * slideIndex
        scrollTo(newPosition)
      }
    },
    [itemCount, visibleCards, scrollTo]
  )

  const resetToStart = useCallback(() => {
    scrollTo(0)
  }, [scrollTo])

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft)
    }
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (!enableAutoScroll || itemCount <= visibleCards || isUserInteracting) {
      return
    }

    const interval = setInterval(() => {
      if (scrollPosition >= maxScroll) {
        resetToStart()
      } else {
        scrollRight()
      }
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [
    enableAutoScroll,
    itemCount,
    visibleCards,
    isUserInteracting,
    scrollPosition,
    maxScroll,
    autoScrollInterval,
    resetToStart,
    scrollRight,
  ])

  // Handle resize and initial setup
  useEffect(() => {
    updateVisibleCards()
    updateMaxScroll()

    const handleResize = () => {
      updateVisibleCards()
      updateMaxScroll()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateVisibleCards, updateMaxScroll])

  // Handle user interaction events
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleInteractionStart = () => setIsUserInteracting(true)
    const handleInteractionEnd = () => {
      setTimeout(() => setIsUserInteracting(false), 1000) // Resume auto-scroll after 1s
    }

    carousel.addEventListener('mouseenter', handleInteractionStart)
    carousel.addEventListener('mouseleave', handleInteractionEnd)
    carousel.addEventListener('touchstart', handleInteractionStart)
    carousel.addEventListener('touchend', handleInteractionEnd)

    return () => {
      carousel.removeEventListener('mouseenter', handleInteractionStart)
      carousel.removeEventListener('mouseleave', handleInteractionEnd)
      carousel.removeEventListener('touchstart', handleInteractionStart)
      carousel.removeEventListener('touchend', handleInteractionEnd)
    }
  }, [])

  const currentSlide = Math.floor(
    ((scrollPosition / (carouselRef.current?.clientWidth || 1)) *
      Math.ceil(itemCount / visibleCards)) /
      itemCount
  )

  const totalSlides = Math.ceil(itemCount / visibleCards)

  const canScrollLeft = scrollPosition > 0
  const canScrollRight = scrollPosition < maxScroll

  return {
    carouselRef,
    scrollPosition,
    visibleCards,
    currentSlide,
    totalSlides,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    scrollToSlide,
    handleScroll,
    isUserInteracting,
  }
}
