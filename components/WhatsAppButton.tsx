import { MessageCircle } from 'lucide-react'
import clsx from 'clsx'

interface WhatsAppButtonProps {
  href: string
  label?: string
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  id?: string
}

export function WhatsAppButton({
  href,
  label = 'Buy Now',
  disabled = false,
  className,
  size = 'md',
  id,
}: WhatsAppButtonProps) {
  if (disabled) {
    return (
      <button
        disabled
        id={id}
        className={clsx(
          'flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 opacity-40 cursor-not-allowed bg-gray-600 text-white',
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-5 py-2.5 text-sm',
          size === 'lg' && 'px-8 py-4 text-base',
          className
        )}
      >
        <MessageCircle className={clsx(size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} />
        Out of Stock
      </button>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      id={id}
      className={clsx(
        'btn-whatsapp justify-center',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-5 py-2.5 text-sm',
        size === 'lg' && 'px-8 py-4 text-base',
        className
      )}
    >
      <MessageCircle className={clsx(size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} />
      {label}
    </a>
  )
}
