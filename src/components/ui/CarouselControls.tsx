interface CarouselControlsProps {
  currentSlide: number
  totalSlides: number
  onSlideClick: (index: number) => void
  className?: string
}

export function CarouselControls({
  currentSlide,
  totalSlides,
  onSlideClick,
  className = 'flex justify-center mt-6 gap-1',
}: CarouselControlsProps) {
  if (totalSlides <= 1) {
    return null
  }

  return (
    <div className={className}>
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isActive = index === currentSlide
        return (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              isActive ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => onSlideClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        )
      })}
    </div>
  )
}
