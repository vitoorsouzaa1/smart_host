import Image from 'next/image'
import { type PropertyImage as PropertyImageType } from '@/hooks/usePropertyCard'

interface PropertyImageProps {
  image: PropertyImageType | null
  title: string
  className?: string
}

export function PropertyImage({ image, title, className = "relative h-48 w-full" }: PropertyImageProps) {
  if (!image) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-400">No image available</span>
      </div>
    )
  }

  return (
    <div className={className}>
      <Image 
        src={image.url} 
        alt={image.caption || title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
    </div>
  )
}