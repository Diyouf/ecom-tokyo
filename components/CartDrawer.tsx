'use client'

import { useCart } from '@/context/CartContext'
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { formatPrice } from '@/lib/whatsapp'

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, clearCart, pricing } = useCart()

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890'
  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME ?? 'Rival in Retro'

  const handleCheckout = () => {
    if (items.length === 0) return

    const lines = items
      .map((item, idx) => {
        const itemPrice = item.product.price
        // Estimate average line item price under the bundle deal
        const avgPrice = pricing.totalUnits >= 2
          ? Math.round(pricing.finalTotal / pricing.totalUnits)
          : itemPrice

        return `${idx + 1}. Jersey: *${item.product.name}*\n   Size: ${item.size} | Qty: ${item.quantity}\n   Price: ₹${(avgPrice * item.quantity).toLocaleString('en-IN')}${pricing.discount > 0 ? ` (Original: ~~₹${(itemPrice * item.quantity).toLocaleString('en-IN')}~~)` : ''}`
      })
      .join('\n\n')

    const discNote = pricing.discount > 0
      ? `\n💸 Discount (Bundle Savings): −₹${pricing.discount.toLocaleString('en-IN')}`
      : ''

    const message = `Hi ${shopName}! 👋\n\nI'd like to place an order:\n\n🛒 *ORDER DETAILS*\n━━━━━━━━━━━━━━━━━━━━━━\n${lines}\n━━━━━━━━━━━━━━━━━━━━━━${discNote}\n🚚 Delivery: ~~₹78~~ → FREE\n✅ *Final Payable Amount: ₹${pricing.finalTotal.toLocaleString('en-IN')}*\n\nPlease confirm availability and share payment details. Thank you!`

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={clsx(
          'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Drawer */}
      <div
        className={clsx(
          'fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-dark-50 border-l border-white/5 flex flex-col transition-transform duration-300 ease-out shadow-2xl',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-bebas tracking-wider text-xl text-white uppercase">Your Cart</h2>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 select-none font-bebas tracking-wider">
              {pricing.totalUnits} {pricing.totalUnits === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:text-primary hover:border-primary border border-white/10 transition-colors text-white/50"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Promo Banner */}
        {pricing.totalUnits > 0 && (
          <div className="bg-primary/10 border-b border-primary/20 p-4 text-center select-none flex-shrink-0">
            {pricing.totalUnits === 1 ? (
              <p className="text-primary font-bold text-xs uppercase tracking-widest font-sans">
                🔥 Add 1 more jersey & get ₹100+ OFF Bundle Savings!
              </p>
            ) : (
              <p className="text-primary font-bold text-xs uppercase tracking-widest font-sans">
                🎉 Bundle discount applied! You saved ₹{pricing.discount.toLocaleString('en-IN')}!
              </p>
            )}
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="text-5xl">🛒</div>
              <h3 className="text-white/40 text-lg uppercase tracking-widest font-bebas">Your cart is empty</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary"
              >
                Browse Jerseys
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 border-b border-white/5 pb-4"
              >
                {/* Thumb */}
                <div className="relative w-16 h-16 bg-dark-100 flex-shrink-0 border border-white/5">
                  {item.product.imageUrl ? (
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">
                      👕
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1">
                  <h4 className="font-bebas tracking-wide text-sm text-white uppercase line-clamp-1">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-white/50 font-sans">
                    <span className="bg-white/5 px-2 py-0.5 border border-white/10 font-bold uppercase">
                      Size {item.size}
                    </span>
                    <span>
                      {formatPrice(item.product.price)} each
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 pt-1.5">
                    <button
                      onClick={() => updateQty(item.product.id, item.size, -1)}
                      className="p-1 hover:bg-white/10 border border-white/10 hover:text-white transition-colors text-white/50 rounded-none"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.size, 1)}
                      className="p-1 hover:bg-white/10 border border-white/10 hover:text-white transition-colors text-white/50 rounded-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Pricing & Delete */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="p-1 text-white/40 hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-primary text-sm font-sans">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-dark-100 space-y-4 flex-shrink-0">
            {/* Delivery free tag */}
            <div className="flex items-center gap-2 text-xs text-white/60 font-medium font-sans">
              <span className="text-green-400 font-extrabold uppercase bg-green-500/10 px-2 py-0.5 border border-green-500/20">
                FREE DELIVERY
              </span>
              <span>on your order!</span>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-sm text-white/60 font-sans border-b border-white/5 pb-4">
              <div className="flex justify-between">
                <span>Subtotal ({pricing.totalUnits} items)</span>
                <span>{formatPrice(pricing.originalTotal)}</span>
              </div>
              {pricing.discount > 0 && (
                <div className="flex justify-between text-green-400 font-bold">
                  <span>Bundle Discount</span>
                  <span>−{formatPrice(pricing.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-400">FREE</span>
              </div>
            </div>

            {/* Final Total */}
            <div className="flex justify-between items-center pb-2">
              <span className="font-bebas tracking-wider text-white text-sm uppercase">Final Amount</span>
              <span className="text-2xl font-black text-primary font-sans">{formatPrice(pricing.finalTotal)}</span>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="btn-whatsapp w-full justify-center py-3.5 rounded-none font-bold uppercase tracking-wider text-sm shadow-lg shadow-green-500/10"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Order via WhatsApp
              </button>
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-white/40 hover:text-white transition-colors py-2 font-semibold uppercase tracking-widest font-sans"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
