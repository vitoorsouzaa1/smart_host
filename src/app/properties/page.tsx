import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

async function getProperties() {
  const properties = await prisma.property.findMany({
    include: {
      images: true,
      amenities: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return properties;
}

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              {property.images.length > 0 ? (
                <Image 
                  src={property.images[0].url} 
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
            
            <CardHeader>
              <CardTitle>{property.title}</CardTitle>
              <CardDescription>{property.city}, {property.country}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-lg font-bold">${property.price.toString()} <span className="text-sm font-normal">per night</span></p>
              <p className="mt-2">{property.description.substring(0, 100)}...</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {property.amenities.slice(0, 3).map((amenity: { id: string, name: string }) => (
                  <span key={amenity.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {amenity.name}
                  </span>
                ))}
                {property.amenities.length > 3 && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    +{property.amenities.length - 3} more
                  </span>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/properties/${property.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}