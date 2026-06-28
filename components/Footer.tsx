import Link from 'next/link'
import { ShoppingBag, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890'

  return (
    <footer className="bg-dark border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 font-bebas text-2xl tracking-widest">
              <span className="text-white font-bebas font-black">RIVAL</span>
              <span className="text-primary font-playfair italic font-normal text-sm lowercase -mx-0.5">in</span>
              <span className="text-white font-bebas font-black">RETRO</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Premium fan-edition football and cricket jerseys. We carry the clubs, the national sides, and the legends — delivered straight to your door across India.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/rivalinretro.kits"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-lg flex items-center justify-center text-white/50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bebas tracking-wider text-white mb-4 uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/#products', label: 'Products' },
                { href: '/#categories', label: 'Categories' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bebas tracking-wider text-white mb-4 uppercase">Collections</h3>
            <ul className="space-y-3">
              {[
                { label: 'Retro Collection', cat: 'retro' },
                { label: 'World Cup 2026', cat: 'world-cup' },
                { label: 'Football Clubs', cat: 'football-club' },
                { label: 'International Football', cat: 'intl-football' },
                { label: 'IPL 2026', cat: 'ipl' },
              ].map((cat) => (
                <li key={cat.cat}>
                  <Link
                    href={`/#categories?category=${cat.cat}`}
                    className="text-white/50 hover:text-primary transition-colors text-sm"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bebas tracking-wider text-white mb-4 uppercase">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-green-400 transition-colors text-sm"
                >
                  +{whatsappNumber} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:hello@rivalinretro.com"
                  className="text-white/50 hover:text-primary transition-colors text-sm"
                >
                  hello@rivalinretro.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp"
                className="btn-whatsapp text-sm py-2.5 px-4"
              >
                <Phone className="w-4 h-4" />
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Rival in Retro. All rights reserved.
          </p>
          <p className="text-primary text-sm font-semibold tracking-wider font-bebas">
            Made for fans. By fans.
          </p>
        </div>
      </div>
    </footer>
  )
}
