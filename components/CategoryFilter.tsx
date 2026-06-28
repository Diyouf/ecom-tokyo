'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Category } from '@/lib/types'

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: 'all', label: 'All Jerseys', emoji: '👕' },
  { value: 'retro', label: 'Retro Collection', emoji: '🕰' },
  { value: 'world-cup', label: 'World Cup 2026', emoji: '🏆' },
  { value: 'football-club', label: 'Football Clubs', emoji: '⚽' },
  { value: 'intl-football', label: 'Intl Football', emoji: '🌍' },
  { value: 'ipl', label: 'IPL 2026', emoji: '🏏' },
  { value: 'cricket', label: 'Jackets & Sleeveless', emoji: '🔥' },
  { value: 'croptops', label: 'Croptops', emoji: '👚' },
  { value: 'f1', label: 'Formula 1', emoji: '🏎️' },
  { value: 'basketball', label: 'Basketball', emoji: '🏀' },
]

interface CategoryFilterProps {
  selected: string
}

export function CategoryFilter({ selected }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSelect = (category: string) => {
    const params = new URLSearchParams()
    if (category !== 'all') params.set('category', category)
    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
  }

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          id={`filter-${cat.value}`}
          onClick={() => handleSelect(cat.value)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2.5 rounded-none text-sm font-medium whitespace-nowrap transition-all duration-200 border uppercase tracking-wider text-xs',
            selected === cat.value || (cat.value === 'all' && !selected)
              ? 'bg-primary text-black border-primary glow-gold font-bold'
              : 'bg-dark-50/40 text-white/60 border-white/5 hover:border-white/20 hover:text-white hover:bg-dark-50'
          )}
        >
          <span>{cat.emoji}</span>
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export { CATEGORIES }
