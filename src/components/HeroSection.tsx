import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SearchHero } from './SearchHero';

export function HeroSection() {
  return (
    <div className="text-center space-y-12 mb-16">
      {/* Hero Title and Description */}
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Find Your Perfect Vacation Rental
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover amazing properties for your next trip. Book with confidence and enjoy unforgettable stays around the world.
        </p>
      </div>

      {/* Search Hero Component */}
      <SearchHero />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Button size="lg" className="px-8 py-3 text-lg" asChild>
          <Link href="/properties">Browse Properties</Link>
        </Button>
        <Button variant="outline" size="lg" className="px-8 py-3 text-lg" asChild>
          <Link href="/host">Become a Host</Link>
        </Button>
      </div>
    </div>
  );
}