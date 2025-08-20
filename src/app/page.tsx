import { prisma } from '@/lib/prisma'
import { HeroSection } from '@/components/HeroSection'
import { FeaturedSection } from '@/components/FeaturedSection'

async function getFeaturedProperties() {
  const properties = await prisma.property.findMany({
    where: { isActive: true },
    include: {
      images: { take: 1 },
      amenities: { take: 3 },
      owner: { select: { name: true } },
    },
    take: 4,
    orderBy: { createdAt: 'desc' },
  })
  
  // Convert Decimal to string to avoid serialization issues
  return properties.map(property => ({
    ...property,
    price: property.price.toString()
  }))
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties()
  
  return (
    <div className="container mx-auto py-16 px-4">
      <HeroSection />
      <FeaturedSection properties={featuredProperties} />
    </div>
  )
}
