'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/lib/types'

export interface CartItem {
  product: Product
  size: string
  quantity: number
}

export interface CartPricing {
  totalUnits: number
  originalTotal: number
  discount: number
  finalTotal: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  addItem: (product: Product, size: string, quantity: number) => void
  removeItem: (productId: string, size: string) => void
  updateQty: (productId: string, size: string, delta: number) => void
  clearCart: () => void
  pricing: CartPricing
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [pricing, setPricing] = useState<CartPricing>({
    totalUnits: 0,
    originalTotal: 0,
    discount: 0,
    finalTotal: 0,
  })

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('rir_cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse cart items', e)
      }
    }
  }, [])

  // Save cart to localStorage and update pricing
  useEffect(() => {
    localStorage.setItem('rir_cart', JSON.stringify(items))

    // Calculate pricing
    const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0)
    const originalTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    let finalTotal = originalTotal
    let discount = 0

    // Bundle Deal logic:
    // Any 2 jerseys for ₹1099, Any 3 for ₹1599.
    // If more, apply average 3-jersey price per item (~₹533 per jersey)
    if (totalUnits === 2) {
      finalTotal = 1099
      discount = originalTotal - finalTotal
    } else if (totalUnits === 3) {
      finalTotal = 1599
      discount = originalTotal - finalTotal
    } else if (totalUnits > 3) {
      finalTotal = Math.round(totalUnits * 533)
      discount = originalTotal - finalTotal
    }

    setPricing({
      totalUnits,
      originalTotal,
      discount,
      finalTotal,
    })
  }, [items])

  const addItem = (product: Product, size: string, quantity: number) => {
    setItems((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id && item.size === size)
      if (idx > -1) {
        const updated = [...prev]
        updated[idx].quantity = Math.min(updated[idx].quantity + quantity, 10)
        return updated
      }
      return [...prev, { product, size, quantity }]
    })
    setIsOpen(true) // Automatically open drawer upon adding an item
  }

  const removeItem = (productId: string, size: string) => {
    setItems((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)))
  }

  const updateQty = (productId: string, size: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const nextQty = item.quantity + delta
            return { ...item, quantity: Math.max(1, Math.min(10, nextQty)) }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        pricing,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
