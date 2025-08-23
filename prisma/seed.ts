import {
  PrismaClient,
  PropertyType,
  AmenityCategory,
} from '../src/generated/prisma'

export const prisma = new PrismaClient()

async function main() {
  await prisma.conversation.deleteMany({})
  await prisma.payment.deleteMany({})
  await prisma.review.deleteMany({})
  await prisma.booking.deleteMany({})
  await prisma.property.deleteMany({})
  await prisma.amenity.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('🧹 Cleaned up existing data')

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@smarthost.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  const hostUser = await prisma.user.create({
    data: {
      email: 'host@smarthost.com',
      name: 'Host User',
      role: 'HOST',
    },
  })

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@smarthost.com',
      name: 'Regular User',
      role: 'USER',
    },
  })

  console.log('👥 Created users')

  // Create amenities with categories
  const amenities = await Promise.all([
    prisma.amenity.create({
      data: { name: 'WiFi', icon: '📶', category: AmenityCategory.ESSENTIAL },
    }),
    prisma.amenity.create({
      data: { name: 'Pool', icon: '🏊', category: AmenityCategory.FEATURE },
    }),
    prisma.amenity.create({
      data: {
        name: 'Kitchen',
        icon: '🍳',
        category: AmenityCategory.ESSENTIAL,
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Parking',
        icon: '🚗',
        category: AmenityCategory.ESSENTIAL,
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Air Conditioning',
        icon: '❄️',
        category: AmenityCategory.ESSENTIAL,
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Pet Friendly',
        icon: '🐕',
        category: AmenityCategory.OTHER,
      },
    }),
    prisma.amenity.create({
      data: { name: 'Gym', icon: '💪', category: AmenityCategory.FEATURE },
    }),
    prisma.amenity.create({
      data: {
        name: 'Beach Access',
        icon: '🏖️',
        category: AmenityCategory.LOCATION,
      },
    }),
    prisma.amenity.create({
      data: { name: 'Hot Tub', icon: '🛁', category: AmenityCategory.FEATURE },
    }),
    prisma.amenity.create({
      data: {
        name: 'Fireplace',
        icon: '🔥',
        category: AmenityCategory.FEATURE,
      },
    }),
  ])

  console.log('🏠 Created amenities')

  // Create properties with all required fields
  const properties = [
    {
      title: 'Luxury Beach Villa',
      description:
        'A stunning beachfront villa with panoramic ocean views, private pool, and direct beach access.',
      price: 450.0,
      address: '123 Ocean Drive',
      city: 'Malibu',
      state: 'California',
      country: 'United States',
      zipCode: '90265',
      bedroomCount: 4,
      bathroomCount: 3,
      maxGuestCount: 8,
      propertyType: PropertyType.VILLA,
      ownerId: hostUser.id,
      isFeatured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
          caption: 'Ocean view',
        },
        {
          url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
          caption: 'Living room',
        },
      ],
      amenityIds: [
        amenities[0].id,
        amenities[1].id,
        amenities[2].id,
        amenities[4].id,
        amenities[7].id,
      ],
    },
    {
      title: 'Modern Downtown Apartment',
      description:
        'Sleek apartment in the heart of the city with skyline views and premium amenities.',
      price: 180.0,
      address: '456 Broadway',
      city: 'New York',
      state: 'New York',
      country: 'United States',
      zipCode: '10013',
      bedroomCount: 2,
      bathroomCount: 2,
      maxGuestCount: 4,
      propertyType: PropertyType.APARTMENT,
      ownerId: hostUser.id,
      isFeatured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          caption: 'City view',
        },
        {
          url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          caption: 'Modern interior',
        },
      ],
      amenityIds: [
        amenities[0].id,
        amenities[2].id,
        amenities[4].id,
        amenities[6].id,
      ],
    },
    {
      title: 'Cozy Mountain Cabin',
      description:
        'Rustic cabin nestled in the mountains, perfect for a peaceful retreat with hiking trails nearby.',
      price: 120.0,
      address: '789 Mountain Trail',
      city: 'Aspen',
      state: 'Colorado',
      country: 'United States',
      zipCode: '81611',
      bedroomCount: 3,
      bathroomCount: 2,
      maxGuestCount: 6,
      propertyType: PropertyType.CABIN,
      ownerId: hostUser.id,
      isFeatured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
          caption: 'Mountain cabin',
        },
        {
          url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
          caption: 'Forest view',
        },
      ],
      amenityIds: [
        amenities[0].id,
        amenities[2].id,
        amenities[9].id,
        amenities[5].id,
      ],
    },
    {
      title: 'Elegant Parisian Loft',
      description:
        'Charming loft in Montmartre with exposed beams, artistic decor, and rooftop terrace.',
      price: 220.0,
      address: '12 Rue de Montmartre',
      city: 'Paris',
      country: 'France',
      zipCode: '75018',
      bedroomCount: 2,
      bathroomCount: 1,
      maxGuestCount: 4,
      propertyType: PropertyType.APARTMENT,
      ownerId: hostUser.id,
      isFeatured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
          caption: 'Parisian loft',
        },
        {
          url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
          caption: 'Artistic interior',
        },
      ],
      amenityIds: [amenities[0].id, amenities[2].id, amenities[4].id],
    },
    {
      title: 'Tropical Island Bungalow',
      description:
        'Overwater bungalow with crystal clear lagoon views, snorkeling gear, and private deck.',
      price: 380.0,
      address: 'Matira Point',
      city: 'Bora Bora',
      country: 'French Polynesia',
      bedroomCount: 1,
      bathroomCount: 1,
      maxGuestCount: 2,
      propertyType: PropertyType.OTHER,
      ownerId: hostUser.id,
      isFeatured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
          caption: 'Overwater bungalow',
        },
        {
          url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
          caption: 'Lagoon view',
        },
      ],
      amenityIds: [
        amenities[0].id,
        amenities[2].id,
        amenities[7].id,
        amenities[8].id,
      ],
    },
    {
      title: 'Historic Tuscan Villa',
      description:
        'Restored 16th-century villa surrounded by vineyards, olive groves, and rolling hills.',
      price: 320.0,
      address: 'Via del Chianti 45',
      city: 'Florence',
      country: 'Italy',
      zipCode: '50125',
      bedroomCount: 5,
      bathroomCount: 4,
      maxGuestCount: 10,
      propertyType: PropertyType.VILLA,
      ownerId: hostUser.id,
      isFeatured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          caption: 'Tuscan villa',
        },
        {
          url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
          caption: 'Vineyard view',
        },
      ],
      amenityIds: [
        amenities[0].id,
        amenities[1].id,
        amenities[2].id,
        amenities[3].id,
        amenities[9].id,
      ],
    },
    {
      title: 'Modern Tokyo Penthouse',
      description:
        'Ultra-modern penthouse with panoramic city views, smart home technology, and rooftop garden.',
      price: 280.0,
      address: '1-1-1 Shibuya',
      city: 'Tokyo',
      country: 'Japan',
      zipCode: '150-0002',
      bedroomCount: 3,
      bathroomCount: 2,
      maxGuestCount: 6,
      propertyType: PropertyType.APARTMENT,
      ownerId: hostUser.id,
      isFeatured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800',
          caption: 'Tokyo skyline',
        },
        {
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
          caption: 'Modern interior',
        },
      ],
      amenityIds: [
        amenities[0].id,
        amenities[2].id,
        amenities[4].id,
        amenities[6].id,
      ],
    },
    {
      title: 'Scandinavian Lake House',
      description:
        'Minimalist lakeside retreat with sauna, kayaks, and stunning aurora viewing opportunities.',
      price: 200.0,
      address: 'Lakeside Road 15',
      city: 'Stockholm',
      country: 'Sweden',
      zipCode: '11122',
      bedroomCount: 4,
      bathroomCount: 2,
      maxGuestCount: 8,
      propertyType: PropertyType.HOUSE,
      ownerId: hostUser.id,
      isFeatured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          caption: 'Lake house',
        },
        {
          url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
          caption: 'Lake view',
        },
      ],
      amenityIds: [
        amenities[0].id,
        amenities[2].id,
        amenities[8].id,
        amenities[9].id,
      ],
    },
  ]

  // Create all properties
  for (const propertyData of properties) {
    const { images, amenityIds, ...propertyInfo } = propertyData

    await prisma.property.create({
      data: {
        ...propertyInfo,
        images: {
          create: images,
        },
        amenities: {
          connect: amenityIds.map((id) => ({ id })),
        },
      },
    })
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
