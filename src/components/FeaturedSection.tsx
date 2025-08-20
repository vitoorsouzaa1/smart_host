import { PropertyCard } from './PropertyCard';

type Property = {
  id: string;
  title: string;
  description: string;
  price: number | string;
  city: string;
  country: string;
  images: Array<{
    id: string;
    url: string;
    caption?: string | null;
  }>;
  amenities: Array<{
    id: string;
    name: string;
    icon?: string | null;
  }>;
};

type FeaturedSectionProps = {
  properties: Property[];
};

export function FeaturedSection({ properties }: FeaturedSectionProps) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            description={property.description}
            price={property.price}
            city={property.city}
            country={property.country}
            images={property.images}
            amenities={property.amenities}
          />
        ))}
      </div>
    </div>
  );
}