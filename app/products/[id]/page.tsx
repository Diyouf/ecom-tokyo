import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductById, getProductsByCategory } from '@/lib/data'
import { getDiscountPercent } from '@/lib/whatsapp'
import { CategoryBadge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/ProductCard'
import { ProductDetailsClient } from '@/components/ProductDetailsClient'
import { ArrowLeft, Package } from 'lucide-react'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProductById(resolvedParams.id)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await getProductById(resolvedParams.id)
  if (!product) notFound()

  const discount = getDiscountPercent(product.price, product.originalPrice)

  // Related products from same category
  const related = (await getProductsByCategory(product.category))
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#categories" className="hover:text-white transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white/70 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Back button */}
        <Link
          href="/#categories"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        {/* Product detail */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative aspect-square rounded-none overflow-hidden bg-dark-50">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="w-24 h-24 text-white/20" />
              </div>
            )}


          </div>

          {/* Info */}
          <ProductDetailsClient product={product} />
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">More in {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
