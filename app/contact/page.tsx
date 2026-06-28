import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with TOKYO Sports. Order via WhatsApp, email, or visit our store.',
}

const contactInfo = [
  {
    icon: Phone,
    title: 'WhatsApp',
    value: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890'}`,
    description: 'Available 9 AM – 9 PM daily',
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890'}`,
    color: 'text-green-400',
    bg: 'bg-green-400/10 border-green-400/20',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@tokyosports.com',
    description: 'We reply within 24 hours',
    href: 'mailto:hello@tokyosports.com',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10 border-blue-400/20',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: '123 Sports Avenue',
    description: 'Athletic District, Mumbai 400001',
    href: 'https://maps.google.com',
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
  },
  {
    icon: Clock,
    title: 'Store Hours',
    value: 'Mon – Sat: 9 AM – 9 PM',
    description: 'Sunday: 10 AM – 7 PM',
    href: null,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border-amber-400/20',
  },
]

export default function ContactPage() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890'

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Contact Us</h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Have a question or want to place an order? We&apos;re always happy to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfo.map(({ icon: Icon, title, value, description, href, color, bg }) => (
              <div
                key={title}
                className={`glass-card p-6 border ${bg} transition-all hover:-translate-y-1 duration-200`}
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4 border`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-bold text-white mb-1">{title}</h3>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`font-medium ${color} hover:underline`}
                  >
                    {value}
                  </a>
                ) : (
                  <p className={`font-medium ${color}`}>{value}</p>
                )}
                <p className="text-white/40 text-sm mt-1">{description}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA + Map */}
          <div className="space-y-6">
            {/* WhatsApp CTA */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-green-800 p-8">
              <div className="absolute top-0 right-0 text-[120px] opacity-10 leading-none">💬</div>
              <div className="relative z-10">
                <div className="text-4xl mb-4">💬</div>
                <h2 className="text-2xl font-bold text-white mb-3">Order on WhatsApp</h2>
                <p className="text-green-100 mb-6">
                  The fastest way to order. Just message us with the product name and we&apos;ll get back to you instantly.
                </p>
                <a
                  href={`https://wa.me/${waNumber}?text=Hi! I'd like to place an order.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp"
                  className="inline-flex items-center gap-3 bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat with Us
                </a>
              </div>
            </div>

            {/* Quick info */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-white mb-4 text-lg">How to Order</h3>
              <ol className="space-y-3">
                {[
                  'Browse our product catalogue above',
                  'Click "Buy Now" on any product',
                  'WhatsApp opens with the product name pre-filled',
                  'Confirm details and delivery address with us',
                  'We process and dispatch your order!',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/20 text-primary text-sm font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-white/60 text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
