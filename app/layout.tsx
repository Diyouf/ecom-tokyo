import type { Metadata } from 'next'
import { Bebas_Neue, Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { ConditionalLayout } from '@/components/ConditionalLayout'
import { CartProvider } from '@/context/CartContext'
import { CartDrawer } from '@/components/CartDrawer'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Rival in Retro — Premium Fan Jerseys',
    template: '%s | Rival in Retro',
  },
  description:
    'Shop premium retro and current fan jerseys, football kits, and sports apparel. Fast delivery across India. Order via WhatsApp.',
  keywords: ['retro jerseys', 'football jerseys', 'cricket jerseys', 'ipl kits', 'world cup kits', 'sports apparel'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Rival in Retro',
    title: 'Rival in Retro — Premium Fan Jerseys',
    description:
      'Shop premium retro and current fan jerseys, football kits, and sports apparel.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${playfairDisplay.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="bg-dark text-white font-sans antialiased min-h-screen">
        <CartProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
