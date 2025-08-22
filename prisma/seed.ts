import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
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

  // Create amenities
  const amenities = await Promise.all([
    prisma.amenity.create({ data: { name: 'WiFi', icon: '📶' } }),
    prisma.amenity.create({ data: { name: 'Pool', icon: '🏊' } }),
    prisma.amenity.create({ data: { name: 'Kitchen', icon: '🍳' } }),
    prisma.amenity.create({ data: { name: 'Parking', icon: '🚗' } }),
    prisma.amenity.create({ data: { name: 'Air Conditioning', icon: '❄️' } }),
    prisma.amenity.create({ data: { name: 'Pet Friendly', icon: '🐕' } }),
    prisma.amenity.create({ data: { name: 'Gym', icon: '💪' } }),
    prisma.amenity.create({ data: { name: 'Beach Access', icon: '🏖️' } }),
    prisma.amenity.create({ data: { name: 'Hot Tub', icon: '🛁' } }),
    prisma.amenity.create({ data: { name: 'Fireplace', icon: '🔥' } }),
  ])

  console.log('🏠 Created amenities')

  // Create properties with diverse locations and features
  const properties = [
    {
      title: 'Luxury Beach Villa',
      description: 'A stunning beachfront villa with panoramic ocean views, private pool, and direct beach access.',
      price: 450.00,
      city: 'Malibu',
      country: 'United States',
      hostId: hostUser.id,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', caption: 'Ocean view' },
        { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', caption: 'Living room' },
      ],
      amenityIds: [amenities[0].id, amenities[1].id, amenities[2].id, amenities[4].id, amenities[7].id]
    },
    {
      title: 'Modern Downtown Apartment',
      description: 'Sleek apartment in the heart of the city with skyline views and premium amenities.',
      price: 180.00,
      city: 'New York',
      country: 'United States',
      hostId: hostUser.id,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', caption: 'City view' },
        { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', caption: 'Modern interior' },
      ],
      amenityIds: [amenities[0].id, amenities[2].id, amenities[4].id, amenities[6].id]
    },
    {
      title: 'Cozy Mountain Cabin',
      description: 'Rustic cabin nestled in the mountains, perfect for a peaceful retreat with hiking trails nearby.',
      price: 120.00,
      city: 'Aspen',
      country: 'United States',
      hostId: hostUser.id,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', caption: 'Mountain cabin' },
        { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', caption: 'Forest view' },
      ],
      amenityIds: [amenities[0].id, amenities[2].id, amenities[9].id, amenities[5].id]
    },
    {
      title: 'Elegant Parisian Loft',
      description: 'Charming loft in Montmartre with exposed beams, artistic decor, and rooftop terrace.',
      price: 220.00,
      city: 'Paris',
      country: 'France',
      hostId: hostUser.id,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', caption: 'Parisian loft' },
        { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800', caption: 'Artistic interior' },
      ],
      amenityIds: [amenities[0].id, amenities[2].id, amenities[4].id]
    },
    {
      title: 'Tropical Island Bungalow',
      description: 'Overwater bungalow with crystal clear lagoon views, snorkeling gear, and private deck.',
      price: 380.00,
      city: 'Bora Bora',
      country: 'French Polynesia',
      hostId: hostUser.id,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', caption: 'Overwater bungalow' },
        { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', caption: 'Lagoon view' },
      ],
      amenityIds: [amenities[0].id, amenities[2].id, amenities[7].id, amenities[8].id]
    },
    {
      title: 'Historic Tuscan Villa',
      description: 'Restored 16th-century villa surrounded by vineyards, olive groves, and rolling hills.',
      price: 320.00,
      city: 'Florence',
      country: 'Italy',
      hostId: hostUser.id,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', caption: 'Tuscan villa' },
        { url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800', caption: 'Vineyard view' },
      ],
      amenityIds: [amenities[0].id, amenities[1].id, amenities[2].id, amenities[3].id, amenities[9].id]
    },
    {
      title: 'Modern Tokyo Penthouse',
      description: 'Ultra-modern penthouse with panoramic city views, smart home technology, and rooftop garden.',
      price: 280.00,
      city: 'Tokyo',
      country: 'Japan',
      hostId: hostUser.id,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800', caption: 'Tokyo skyline' },
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', caption: 'Modern interior' },
      ],
      amenityIds: [amenities[0].id, amenities[2].id, amenities[4].id, amenities[6].id]
    },
    {
      title: 'Scandinavian Lake House',
      description: 'Minimalist lakeside retreat with sauna, kayaks, and stunning aurora viewing opportunities.',
      price: 200.00,
      city: 'Stockholm',
      country: 'Sweden',
      hostId: hostUser.id,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', caption: 'Lake house' },
        { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', caption: 'Lake view' },
      ],
      amenityIds: [amenities[0].id, amenities[2].id, amenities[8].id, amenities[9].id]
    }
  ]

  // Create all properties
  for (const propertyData of properties) {
    const { images, amenityIds, ...propertyInfo } = propertyData
    
    const property = await prisma.property.create({
      data: {
        ...propertyInfo,
        images: {
          create: images
        },
        amenities: {
          connect: amenityIds.map(id => ({ id }))
        }
      }
    })
    
    console.log(`🏡 Created property: ${property.title}`)
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
