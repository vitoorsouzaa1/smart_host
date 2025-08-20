import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Find your perfect vacation rental with SmartHost
        </h1>
        <p className="text-xl text-gray-600">
          Discover amazing properties for your next trip. Book with confidence and enjoy your stay.
        </p>
        <div className="flex gap-4 pt-4">
          <Button size="lg" asChild>
            <Link href="/properties">Browse Properties</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/host">Become a Host</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-80 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h2 className="text-white text-3xl font-bold text-center px-6">Experience Luxury Accommodations</h2>
        </div>
      </div>
    </div>
  );
}