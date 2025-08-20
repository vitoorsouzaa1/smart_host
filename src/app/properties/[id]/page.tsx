import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getProperty(id: string) {
  const property = await prisma.property.findUnique({
    where: { id },
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
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });
  return property;
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);

  if (!property) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
        <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/properties">Back to Properties</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Link href="/properties" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Properties
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="text-gray-600 mb-6">{property.city}, {property.country}</p>
          
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-6">
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
          
          {property.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mb-6">
              {property.images.slice(1, 5).map((image: { id: string, url: string }) => (
                <div key={image.id} className="relative h-24 rounded-md overflow-hidden">
                  <Image 
                    src={image.url} 
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">About this property</h2>
            <p className="text-gray-700">{property.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity: { id: string, name: string }) => (
                <div key={amenity.id} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {property.reviews.length > 0 ? (
              <div className="space-y-4">
                {property.reviews.map((review: { id: string, user: { name: string }, rating: number, createdAt: Date, comment: string | null }) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{review.user.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      <CardDescription>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
        
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">${property.price.toString()} <span className="text-sm font-normal">per night</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Check-in</label>
                <input type="date" className="w-full border rounded-md p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Check-out</label>
                <input type="date" className="w-full border rounded-md p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Guests</label>
                <select className="w-full border rounded-md p-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book Now</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}