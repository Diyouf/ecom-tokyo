'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, Phone } from 'lucide-react'
import clsx from 'clsx'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#products', label: 'Products' },
  { href: '/#categories', label: 'Categories' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { setIsOpen: setCartOpen, totalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890'

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 group font-bebas text-2xl tracking-widest" id="navbar-logo">
            <span className="text-white font-bebas font-black">RIVAL</span>
            <span className="text-primary font-playfair italic font-normal text-sm lowercase -mx-0.5">in</span>
            <span className="text-white font-bebas font-black">RETRO</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white font-semibold transition-colors relative group uppercase tracking-wider text-xs"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-none flex items-center justify-center transition-colors mr-1"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4 text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-black font-extrabold text-[9px] w-4.5 h-4.5 rounded-none border border-black flex items-center justify-center select-none font-bebas">
                  {totalItems}
                </span>
              )}
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-whatsapp"
              className="btn-whatsapp py-2.5 px-4 text-xs uppercase tracking-wider font-extrabold"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>
          </div>

          {/* Mobile Actions (Cart + Menu Toggle) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-none flex items-center justify-center transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4 text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-black font-extrabold text-[8px] w-4 h-4 rounded-none border border-black flex items-center justify-center select-none font-bebas">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              id="navbar-menu-toggle"
              className="p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(
            'md:hidden overflow-hidden transition-all duration-300',
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-1 border-t border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-none transition-colors uppercase tracking-wider text-xs font-semibold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center text-xs uppercase tracking-wider font-extrabold"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
