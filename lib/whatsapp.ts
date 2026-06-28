/**
 * Build a WhatsApp deep link with a prefilled message
 */
export function buildWhatsAppUrl(
  productName: string,
  price: number,
  whatsappNumber?: string
): string {
  const number = whatsappNumber ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890'
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

  const message = encodeURIComponent(
    `Hi! I'm interested in ordering:\n\n*${productName}*\nPrice: ${formattedPrice}\n\nPlease confirm availability.`
  )

  return `https://wa.me/${number}?text=${message}`
}

/**
 * Format a price in Indian Rupees
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercent(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
