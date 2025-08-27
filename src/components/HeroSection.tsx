import { SearchHero } from './SearchHero'

export function HeroSection() {
  return (
    <div className='text-center space-y-16 py-16 md:py-24'>
      {/* Hero Title and Description */}
      <div className='space-y-8 animate-fade-in'>
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient-brand leading-tight'>
          Find Your Perfect
          <br />
          <span className='text-gray-900'>Vacation Rental</span>
        </h1>
        <p className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4'>
          Discover amazing properties for your next trip. Book with confidence
          and enjoy unforgettable stays around the world.
        </p>
        
        {/* Trust Indicators */}
        <div className='flex flex-wrap justify-center items-center gap-8 pt-8 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
            </svg>
            <span>Verified Properties</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd' />
            </svg>
            <span>Instant Booking</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-purple-500' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Search Hero Component */}
      <div className='animate-slide-up'>
        <SearchHero />
      </div>
    </div>
  )
}
