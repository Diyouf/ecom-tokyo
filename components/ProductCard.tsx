import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { formatPrice, getDiscountPercent } from '@/lib/whatsapp'
import { CategoryBadge } from './ui/Badge'
import { Package, Star } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

function getProductRating(id: string) {
  let hash = 5381
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) + hash + id.charCodeAt(i)
  }
  const ratingBucket = Math.abs(hash) % 100
  const rating = ratingBucket < 80 ? 4.9 : ratingBucket < 95 ? 4.8 : 4.7
  const reviews = 50 + (Math.abs(hash) % 251)
  return { rating, reviews }
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = getDiscountPercent(product.price, product.originalPrice)
  const { rating, reviews } = getProductRating(product.id)

  return (
    <div className="glass-card overflow-hidden group glow-gold-hover transition-all duration-300 hover:-translate-y-1 flex flex-col border border-white/5 bg-dark-50/20">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-dark-100/40">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-16 h-16 text-white/10" />
          </div>
        )}



        {/* Stock overlays */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 right-3 bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-none uppercase select-none font-sans">
            Only {product.stock} left
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-dark/80 flex items-center justify-center z-10 select-none">
            <span className="bg-dark-50 text-white/50 text-xs font-semibold px-4 py-2 border border-white/5 rounded-none uppercase tracking-widest font-bebas">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category Label */}
        <span className="text-[10px] text-primary/70 font-semibold uppercase tracking-widest mb-1.5 font-sans">
          {product.category.replace('-', ' ')} kit
        </span>

        {/* Product Title */}
        <Link href={`/products/${product.id}`} className="group/title block">
          <h3 className="font-playfair font-bold text-white text-base leading-snug mb-2 group-hover/title:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Deterministic Star Ratings */}
        <div className="flex items-center gap-1 text-[11px] text-primary mb-3 select-none font-sans font-medium">
          <Star className="w-3.5 h-3.5 fill-current shrink-0" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-white/40">({reviews}+ reviews)</span>
        </div>

        {/* Price & Actions spacing wrapper */}
        <div className="mt-auto space-y-4">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white font-sans">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-white/30 line-through text-xs font-sans">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {discount && (
              <span className="bg-primary text-black text-[10px] font-extrabold px-2 py-0.5 rounded-none font-sans uppercase select-none">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Details CTA */}
          <Link
            href={`/products/${product.id}`}
            id={`view-${product.id}`}
            className="btn-primary w-full text-center py-2.5 font-extrabold flex items-center justify-center rounded-none"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
