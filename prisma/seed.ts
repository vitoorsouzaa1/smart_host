import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.$transaction([
    prisma.notification.deleteMany(),
    prisma.message.deleteMany(),
    prisma.conversation.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.review.deleteMany(),
    prisma.booking.deleteMany(),
    prisma.unavailableDate.deleteMany(),
    prisma.propertyImage.deleteMany(),
    prisma.property.deleteMany(),
    prisma.amenity.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@smarthost.com',
      password: 'hashed_password_here', // In production, use proper password hashing
      role: 'ADMIN',
    },
  });

  const hostUser = await prisma.user.create({
    data: {
      name: 'Host User',
      email: 'host@smarthost.com',
      password: 'hashed_password_here', // In production, use proper password hashing
      role: 'HOST',
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@smarthost.com',
      password: 'hashed_password_here', // In production, use proper password hashing
      role: 'USER',
    },
  });

  // Create amenities
  const amenities = await Promise.all([
    prisma.amenity.create({
      data: {
        name: 'WiFi',
        icon: 'wifi',
        category: 'ESSENTIAL',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Kitchen',
        icon: 'kitchen',
        category: 'ESSENTIAL',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Free Parking',
        icon: 'parking',
        category: 'FEATURE',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Pool',
        icon: 'pool',
        category: 'FEATURE',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Beach Access',
        icon: 'beach',
        category: 'LOCATION',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Smoke Alarm',
        icon: 'alarm',
        category: 'SAFETY',
      },
    }),
  ]);

  // Create properties
  const property1 = await prisma.property.create({
    data: {
      title: 'Luxury Beach Villa',
      description: 'Beautiful villa with ocean views and private pool',
      price: 250.00,
      address: '123 Beach Road',
      city: 'Miami',
      state: 'Florida',
      country: 'USA',
      zipCode: '33139',
      latitude: 25.7617,
      longitude: -80.1918,
      bedroomCount: 3,
      bathroomCount: 2,
      maxGuestCount: 6,
      propertyType: 'VILLA',
      ownerId: hostUser.id,
      amenities: {
        connect: amenities.map(amenity => ({ id: amenity.id })),
      },
      images: {
        create: [
          {
            url: 'https://example.com/villa1.jpg',
            caption: 'Front view',
          },
          {
            url: 'https://example.com/villa2.jpg',
            caption: 'Pool area',
          },
        ],
      },
    },
  });

  const property2 = await prisma.property.create({
    data: {
      title: 'Downtown Apartment',
      description: 'Modern apartment in the heart of the city',
      price: 120.00,
      address: '456 Main Street',
      city: 'New York',
      state: 'New York',
      country: 'USA',
      zipCode: '10001',
      latitude: 40.7128,
      longitude: -74.0060,
      bedroomCount: 1,
      bathroomCount: 1,
      maxGuestCount: 2,
      propertyType: 'APARTMENT',
      ownerId: hostUser.id,
      amenities: {
        connect: [{ id: amenities[0].id }, { id: amenities[1].id }],
      },
      images: {
        create: [
          {
            url: 'https://example.com/apartment1.jpg',
            caption: 'Living room',
          },
        ],
      },
    },
  });

  // Create a booking
  const booking = await prisma.booking.create({
    data: {
      startDate: new Date('2023-12-01'),
      endDate: new Date('2023-12-07'),
      totalPrice: 1500.00,
      guestCount: 2,
      userId: regularUser.id,
      propertyId: property1.id,
      specialRequests: 'Late check-in requested',
    },
  });

  // Create a review
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Amazing property! We had a wonderful stay.',
      userId: regularUser.id,
      propertyId: property1.id,
      bookingId: booking.id,
    },
  });

  // Create a payment
  await prisma.payment.create({
    data: {
      amount: 1500.00,
      currency: 'USD',
      status: 'COMPLETED',
      paymentMethod: 'CREDIT_CARD',
      paymentIntentId: 'pi_123456789',
      userId: regularUser.id,
      bookingId: booking.id,
    },
  });

  // Create a conversation
  const conversation = await prisma.conversation.create({
    data: {
      participantIds: [regularUser.id, hostUser.id],
    },
  });

  // Create messages
  await prisma.message.create({
    data: {
      content: 'Hi, I have a question about your property.',
      senderId: regularUser.id,
      receiverId: hostUser.id,
      conversationId: conversation.id,
    },
  });

  await prisma.message.create({
    data: {
      content: 'Hello! I would be happy to answer any questions you have.',
      senderId: hostUser.id,
      receiverId: regularUser.id,
      conversationId: conversation.id,
    },
  });

  // Create notifications
  await prisma.notification.create({
    data: {
      type: 'BOOKING_CONFIRMED',
      message: 'Your booking for Luxury Beach Villa has been confirmed.',
      userId: regularUser.id,
    },
  });

  await prisma.notification.create({
    data: {
      type: 'BOOKING_REQUEST',
      message: 'You have a new booking request for your property.',
      userId: hostUser.id,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });