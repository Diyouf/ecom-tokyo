import { Suspense } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { ProductGrid } from '@/components/ProductGrid'
import { CategoryFilter } from '@/components/CategoryFilter'
import { getFeaturedProducts, getProductsByCategory } from '@/lib/data'
import { Sparkles, Grid3x3 } from 'lucide-react'
import clsx from 'clsx'

interface HomePageProps {
  searchParams: { category?: string }
}

function Ticker() {
  const items = [
    "⚽ FIFA WORLD CUP 2026 JERSEYS NOW AVAILABLE",
    "🏏 IPL 2026 SEASON COLLECTION IS LIVE",
    "🔥 ANY 2 JERSEYS FOR ₹1099 — ANY 3 FOR ₹1599",
    "✈ FREE DELIVERY ON ALL ORDERS",
    "💬 ORDER DIRECTLY ON WHATSAPP — FAST & SIMPLE"
  ]

  const repeatedItems = [...items, ...items]

  return (
    <div className="bg-primary text-black overflow-hidden py-3 font-bebas text-sm tracking-wider uppercase select-none border-b border-black/10 mt-16 md:mt-20">
      <div className="whitespace-nowrap flex animate-ticker">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center flex-shrink-0">
            <span className="px-10 font-bold">{item}</span>
            {idx < repeatedItems.length - 1 && <span className="opacity-30 text-xs">◆</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function StatsSection() {
  const stats = [
    { value: '2500+', label: 'Jerseys Delivered' },
    { value: '1500+', label: 'Happy Customers' },
    { value: '20', label: 'Collections' },
    { value: '4.9 ★', label: 'Customer Rating' }
  ]

  return (
    <div className="bg-dark-50 border-y border-white/5 py-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={clsx(
              "space-y-1 flex flex-col justify-center",
              idx > 0 ? "md:border-l md:border-white/5" : "",
              idx % 2 === 1 ? "border-l border-white/5 md:border-l-0" : ""
            )}
          >
            <div className="text-3xl md:text-4xl font-bebas tracking-wide text-primary">{stat.value}</div>
            <div className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DropAlertsBanner() {
  const whatsappChannelUrl = 'https://whatsapp.com/channel/0029Vb7fNe1ADTOIEggxRt0R'

  return (
    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 border-b border-green-500/15 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="text-[10px] text-green-400 font-extrabold uppercase tracking-widest font-sans">📢 New Drop Alerts</span>
          <h3 className="text-xl md:text-2xl font-bebas tracking-wider text-white uppercase mt-1">Shop on WhatsApp</h3>
          <p className="text-white/50 text-xs md:text-sm mt-0.5 max-w-xl font-sans">
            Get exclusive deals, new arrivals & order updates directly on WhatsApp
          </p>
        </div>
        <a
          href={whatsappChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider shrink-0 rounded-none"
        >
          Join Now
        </a>
      </div>
    </div>
  )
}

function RivalPromise() {
  const features = [
    { emoji: '🧵', title: 'Premium Quality', text: 'Fan-edition grade — breathable, durable, and built to last through every match day.' },
    { emoji: '🔥', title: 'Bundle Savings', text: 'Any 2 jerseys ₹1099 · Any 3 jerseys ₹1599. Add more to cart & save more automatically.' },
    { emoji: '💬', title: 'WhatsApp Ordering', text: 'No complex checkouts. Order directly on WhatsApp — personal, fast, and human.' },
    { emoji: '✈️', title: 'Free Delivery', text: 'Every order ships free across India. No minimum order value. No hidden charges.' }
  ]

  return (
    <section className="bg-dark-50 border-t border-white/5 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary text-[10px] font-extrabold uppercase tracking-widest font-sans">Why Choose Us</span>
          <h2 className="section-title mt-1">The Rival Promise</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-dark p-8 text-center flex flex-col items-center hover:bg-dark-50/40 transition-colors">
              <span className="text-3xl mb-4 select-none">{feat.emoji}</span>
              <h3 className="font-playfair font-bold text-white text-base mb-2">{feat.title}</h3>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed">{feat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const selectedCategory = searchParams.category ?? 'all'

  const [featured, categoryProducts] = await Promise.all([
    getFeaturedProducts(),
    getProductsByCategory(selectedCategory),
  ])

  return (
    <>
      {/* Ticker marquee banner */}
      <Ticker />

      {/* Hero */}
      <HeroSection />

      {/* Stats Counter Section */}
      <StatsSection />

      {/* New Drop Alerts Banner */}
      <DropAlertsBanner />

      {/* Featured Products */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary/20 flex items-center justify-center border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="text-primary font-medium text-xs uppercase tracking-widest font-sans">Handpicked · Limited Pieces</span>
        </div>
        <h2 className="section-title">Signature Collection</h2>
        <p className="text-white/50 text-xs md:text-sm mb-8 uppercase tracking-widest max-w-2xl font-bebas">
          Each piece selected for its story, its rarity, and its craftsmanship. These are not just jerseys — they are statements.
        </p>

        <ProductGrid products={featured} emptyMessage="No featured products yet." />
      </section>

      {/* All Products / Category Browser */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary/20 flex items-center justify-center border border-primary/20">
            <Grid3x3 className="w-4 h-4 text-primary" />
          </div>
          <span className="text-primary font-medium text-xs uppercase tracking-widest font-sans">Browse Collections</span>
        </div>
        <h2 className="section-title">All Jerseys</h2>
        <p className="text-white/50 text-xs md:text-sm mb-8 uppercase tracking-widest font-bebas">Filter by collection category</p>

        {/* Category filter */}
        <div className="mb-8">
          <CategoryFilter selected={selectedCategory} />
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="glass-card aspect-[3/4] animate-pulse" />
              ))}
            </div>
          }
        >
          <ProductGrid
            products={categoryProducts}
            emptyMessage={`No products in this category yet.`}
          />
        </Suspense>
      </section>

      {/* The Rival Promise Features */}
      <RivalPromise />

      {/* WhatsApp CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-dark-50 to-dark-100 border border-primary/20 p-10 text-center glow-gold">
            <div className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative z-10">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-3xl font-bebas tracking-wide text-white mb-3">Order via WhatsApp</h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Skip the checkout. Just tap "Buy Now" on any product and chat with us directly.
                Fast, friendly, and hassle-free bundle savings.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890'}`}
                target="_blank"
                rel="noopener noreferrer"
                id="home-whatsapp-cta"
                className="inline-flex items-center gap-3 bg-primary text-black font-extrabold px-8 py-4 rounded-none text-lg hover:scale-105 transition-transform uppercase tracking-wider text-sm font-sans"
              >
                💬 Start a Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
