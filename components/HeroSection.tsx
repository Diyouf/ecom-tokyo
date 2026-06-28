import Link from 'next/link'
import { ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react'

const stats = [
  { label: 'Jerseys Delivered', value: '2,500+' },
  { label: 'Happy Customers', value: '1,500+' },
  { label: 'Collections', value: '20' },
]

const features = [
  { icon: Zap, label: 'Instant WhatsApp Orders' },
  { icon: ShieldCheck, label: 'Premium Fan-Edition Kits' },
  { icon: Truck, label: 'Free Delivery Across India' },
]

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-68px)] flex items-center overflow-hidden pt-10 pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-50 to-primary/5" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-none px-3 py-1.5 select-none">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-xs font-semibold uppercase tracking-widest font-sans">Premium Sport Jerseys</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bebas leading-none tracking-widest text-balance uppercase">
              <span className="text-white">Wear The </span>
              <span className="text-primary italic font-playfair font-normal lowercase tracking-normal">legend.</span>
              <br />
              <span className="text-white">Own The </span>
              <span className="gradient-text font-black">Game.</span>
            </h1>

            {/* Sub */}
            <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg">
              Football clubs. International sides. Retro masterpieces. World Cup 2026 & IPL 2026. Every jersey made for the real fan — not the casual one.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-3">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-white/70 text-sm">
                  <div className="w-6 h-6 bg-primary/10 border border-primary/20 rounded-none flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  {label}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/#products" id="hero-shop-now" className="btn-primary flex items-center gap-2">
                Shop All Jerseys
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost py-3 px-6 text-sm font-semibold uppercase tracking-wider hover:border-primary hover:text-primary transition-all duration-200"
              >
                Shop on WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bebas tracking-wide text-primary">{stat.value}</div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:block relative animate-slide-up">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-primary/5 animate-pulse-slow" />
              <div className="absolute inset-8 rounded-full border border-primary/10" />
              <div className="absolute inset-16 rounded-full border border-primary/15" />

              {/* Central glow */}
              <div className="absolute inset-24 bg-primary/5 rounded-full blur-2xl" />

              {/* Main image card */}
              <div className="absolute inset-20 glass-card border-primary/25 overflow-hidden glow-gold flex items-center justify-center bg-dark-50/80">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4 animate-pulse" style={{ animationDuration: '3s' }}>👕</div>
                  <div className="text-white font-bebas text-3xl tracking-widest uppercase">
                    RIVAL <span className="text-primary font-serif italic text-lg lowercase -mx-0.5">in</span> RETRO
                  </div>
                  <div className="text-primary/70 text-xs mt-2 uppercase tracking-widest font-semibold font-sans">
                    Premium Kits Collection
                  </div>
                </div>
              </div>

              {/* Floating product chips */}
              <div className="absolute top-8 right-4 glass-card border-primary/20 px-4 py-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="text-xs text-white/50 uppercase tracking-widest font-semibold font-sans">Best Seller</div>
                <div className="text-white font-bold text-sm">Retro 1998 Jersey</div>
                <div className="text-primary font-extrabold">₹899</div>
              </div>

              <div className="absolute bottom-12 left-4 glass-card border-primary/20 px-4 py-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="text-xs text-white/50 uppercase tracking-widest font-semibold font-sans">New Arrival</div>
                <div className="text-white font-bold text-sm">Argentina 3-Star</div>
                <div className="text-primary font-extrabold">₹999</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent z-10" />
    </section>
  )
}
