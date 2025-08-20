import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

// In a real application, this would use authentication to get the current user's ID
// For demo purposes, we'll use a hardcoded user ID
async function getUserBookings() {
  const userId = "clsxyz123456"; // This should be the ID of a user in your database
  
  const bookings = await prisma.booking.findMany({
    where: {
      userId: userId,
    },
    include: {
      property: {
        include: {
          images: true,
        },
      },
    },
    orderBy: {
      startDate: 'desc',
    },
  });
  
  return bookings;
}

export default async function BookingsPage() {
  const bookings = await getUserBookings();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="relative h-48 md:h-auto md:w-1/3">
                  {booking.property.images && booking.property.images.length > 0 ? (
                    <Image 
                      src={booking.property.images[0].url} 
                      alt={booking.property.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No image available</p>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold mb-2">{booking.property.title}</h2>
                      <p className="text-gray-600 mb-4">{booking.property.city}, {booking.property.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${booking.totalPrice.toString()}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-4">
                    <Button variant="outline" asChild>
                      <Link href={`/properties/${booking.propertyId}`}>View Property</Link>
                    </Button>
                    {booking.status === 'CONFIRMED' && (
                      <Button variant="destructive">Cancel Booking</Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">You don't have any bookings yet</h2>
          <p className="text-gray-600 mb-6">Start exploring properties and book your next stay!</p>
          <Button asChild>
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case 'CONFIRMED':
      return 'bg-green-100 text-green-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    case 'COMPLETED':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}