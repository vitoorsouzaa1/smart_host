'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/card';

type PropertyImage = {
  id: string;
  url: string;
  caption?: string | null;
};

type Amenity = {
  id: string;
  name: string;
  icon?: string | null;
};

type PropertyCardProps = {
  id: string;
  title: string;
  description: string;
  price: number | string;
  city: string;
  country: string;
  images: PropertyImage[];
  amenities?: Amenity[];
};

export function PropertyCard({
  id,
  title,
  description,
  price,
  city,
  country,
  images,
  amenities = [],
}: PropertyCardProps) {
  // Format price if it's a number
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : price;
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        {images[0] ? (
          <Image 
            src={images[0].url} 
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription>{city}, {country}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="font-medium text-lg">${formattedPrice} per night</p>
        <p className="text-gray-600 mt-2 line-clamp-2">{description}</p>
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {amenities.slice(0, 3).map((amenity) => (
              <span key={amenity.id} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {amenity.name}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/properties/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}