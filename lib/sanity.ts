import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { perfumesQuery, perfumeBySlugQuery, featuredPerfumesQuery } from '@/sanity/lib/queries'
import { SanityPerfume } from '@/types/sanity'
import { Perfume } from '@/types/perfume'

export async function getPerfumes(): Promise<Perfume[]> {
  try {
    const sanityPerfumes: SanityPerfume[] = await client.fetch(perfumesQuery)
    
    return sanityPerfumes.map(transformSanityPerfume)
  } catch (error) {
    console.error('Error fetching perfumes from Sanity:', error)
    // Fallback to static data
    const { perfumes } = await import('@/data/perfumes')
    return perfumes
  }
}

export async function getFeaturedPerfumes(): Promise<Perfume[]> {
  try {
    const sanityPerfumes: SanityPerfume[] = await client.fetch(featuredPerfumesQuery)
    
    return sanityPerfumes.map(transformSanityPerfume)
  } catch (error) {
    console.error('Error fetching featured perfumes from Sanity:', error)
    // Fallback to static data
    const { perfumes } = await import('@/data/perfumes')
    return perfumes.filter(p => p.featured)
  }
}

export async function getPerfumeBySlug(slug: string): Promise<Perfume | null> {
  try {
    const sanityPerfume: SanityPerfume = await client.fetch(perfumeBySlugQuery, { slug })
    
    if (!sanityPerfume) return null
    
    return transformSanityPerfume(sanityPerfume)
  } catch (error) {
    console.error('Error fetching perfume by slug from Sanity:', error)
    return null
  }
}

function transformSanityPerfume(sanityPerfume: SanityPerfume): Perfume {
  return {
    id: sanityPerfume._id,
    name: sanityPerfume.name,
    brand: sanityPerfume.brand.name,
    sizes: sanityPerfume.sizes,
    description: sanityPerfume.description,
    image: urlForImage(sanityPerfume.image)?.width(800).height(600).url() || '',
    category: sanityPerfume.category.value,
    notes: sanityPerfume.notes,
    inStock: sanityPerfume.inStock,
    featured: sanityPerfume.featured,
    set: sanityPerfume.set,
    spring: sanityPerfume.spring,
    summer: sanityPerfume.summer,
    winter: sanityPerfume.winter,
    autumn: sanityPerfume.autumn,
  }
}

export { urlForImage }
