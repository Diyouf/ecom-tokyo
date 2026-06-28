'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
import { useCart } from '@/context/CartContext'
import { formatPrice, getDiscountPercent } from '@/lib/whatsapp'
import { CheckCircle2, XCircle, ShoppingBag, MessageCircle, Plus, Minus } from 'lucide-react'

interface ProductDetailsClientProps {
  product: Product
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [quantity, setQuantity] = useState<number>(1)
  const { addItem } = useCart()

  const discount = getDiscountPercent(product.price, product.originalPrice)
  const sizes = ['S', 'M', 'L', 'XL', 'XXL']
  const totalAmount = product.price * quantity

  const handleAddToCart = () => {
    if (product.stock === 0) return
    addItem(product, selectedSize, quantity)
  }

  const handleBuyNow = () => {
    if (product.stock === 0) return
    const shopName = process.env.NEXT_PUBLIC_SHOP_NAME ?? 'Rival in Retro'
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890'
    
    const lines = `1. Jersey: *${product.name}*\n   Size: ${selectedSize} | Qty: ${quantity}\n   Price: ${formatPrice(totalAmount)}`
    const message = `Hi ${shopName}! 👋\n\nI'd like to buy this jersey:\n\n🛒 *ORDER DETAILS*\n━━━━━━━━━━━━━━━━━━━━━━\n${lines}\n━━━━━━━━━━━━━━━━━━━━━━\n🚚 Delivery: FREE\n✅ *Final Payable Amount: ${formatPrice(totalAmount)}*\n\nPlease confirm availability and share payment details. Thank you!`
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="flex flex-col justify-center space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bebas tracking-wide font-black text-white leading-tight mb-3 uppercase">
          {product.name}
        </h1>
        <p className="text-white/60 text-base leading-relaxed">{product.description}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-4">
        <span className="text-4xl font-extrabold text-white font-sans">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <div className="flex items-center gap-2">
            <span className="text-white/30 line-through text-lg font-sans">
              {formatPrice(product.originalPrice)}
            </span>
            {discount && (
              <span className="bg-primary/15 text-primary text-xs font-extrabold px-2 py-0.5 border border-primary/20 select-none">
                Save {discount}%
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stock status */}
      <div className="flex items-center gap-2 select-none font-sans">
        {product.stock > 0 ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-bold text-sm">
              {product.stock <= 5
                ? `Only ${product.stock} left in stock!`
                : `In Stock (${product.stock} available)`}
            </span>
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-bold text-sm">Out of Stock</span>
          </>
        )}
      </div>

      {/* Size Selector */}
      <div className="space-y-2 select-none">
        <span className="block text-[10px] text-white/40 uppercase tracking-widest font-extrabold font-sans">Choose Size</span>
        <div className="flex gap-2">
          {sizes.map((sz) => (
            <button
              key={sz}
              disabled={product.stock === 0}
              onClick={() => setSelectedSize(sz)}
              className={`w-12 h-12 flex items-center justify-center font-bold text-sm transition-all border ${
                selectedSize === sz
                  ? 'bg-primary text-black border-primary font-black scale-105'
                  : 'bg-dark-50/20 text-white/60 border-white/5 hover:border-white/20'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity incrementer */}
      <div className="space-y-2 select-none">
        <span className="block text-[10px] text-white/40 uppercase tracking-widest font-extrabold font-sans">Quantity</span>
        <div className="flex items-center gap-1.5">
          <button
            disabled={product.stock === 0}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-2 hover:bg-white/10 border border-white/10 hover:text-white transition-colors text-white/50 disabled:opacity-40"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-bold text-lg">{quantity}</span>
          <button
            disabled={product.stock === 0}
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="p-2 hover:bg-white/10 border border-white/10 hover:text-white transition-colors text-white/50 disabled:opacity-40"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live total row */}
      <div className="bg-dark-50 border border-white/5 p-4 flex items-center justify-between font-sans select-none">
        <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">Item Total</span>
        <span className="text-xl font-bold text-primary">{formatPrice(totalAmount)}</span>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="btn-ghost flex-1 py-3.5 flex items-center justify-center gap-2 uppercase tracking-wider text-xs font-bold text-white hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          className="btn-whatsapp flex-1 py-3.5 flex items-center justify-center gap-2 uppercase tracking-wider text-xs font-extrabold disabled:opacity-40 disabled:cursor-not-allowed rounded-none"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          Buy Instantly
        </button>
      </div>

      {/* Bundle Promo Callout */}
      <div className="bg-primary/5 border border-primary/20 p-4 font-sans space-y-1.5 select-none">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
          💡 Bundle Savings Active
        </div>
        <p className="text-white/60 text-xs leading-relaxed">
          Buy any 2 jerseys for <strong className="text-white">₹1,099</strong> or any 3 jerseys for <strong className="text-white">₹1,599</strong> across the website! Discount applies automatically in the cart.
        </p>
      </div>
    </div>
  )
}
