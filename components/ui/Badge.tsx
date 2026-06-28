import clsx from 'clsx'
import { Category } from '@/lib/types'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-1 rounded-none text-xs font-medium',
        variant === 'default' && 'bg-white/10 text-white/70 border border-white/10',
        variant === 'success' && 'bg-green-500/20 text-green-400 border border-green-500/30',
        variant === 'warning' && 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
        variant === 'danger' && 'bg-red-500/20 text-red-400 border border-red-500/30',
        className
      )}
    >
      {children}
    </span>
  )
}

const categoryBadgeMap: Record<Exclude<Category, 'all'>, string> = {
  retro: 'badge-retro',
  'world-cup': 'badge-world-cup',
  'football-club': 'badge-football-club',
  'intl-football': 'badge-intl-football',
  ipl: 'badge-ipl',
  cricket: 'badge-cricket',
  croptops: 'badge-croptops',
  f1: 'badge-f1',
  basketball: 'badge-basketball',
}

const categoryLabelMap: Record<Exclude<Category, 'all'>, string> = {
  retro: '🕰 Retro Collection',
  'world-cup': '🏆 World Cup 2026',
  'football-club': '⚽ Football Club',
  'intl-football': '🌍 Intl Football',
  ipl: '🏏 IPL 2026',
  cricket: '🔥 Jackets & Sleeveless',
  croptops: '👚 Croptops',
  f1: '🏎️ Formula 1',
  basketball: '🏀 Basketball',
}

export function CategoryBadge({ category }: { category: Exclude<Category, 'all'> }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-1 rounded-none text-xs font-medium',
        categoryBadgeMap[category]
      )}
    >
      {categoryLabelMap[category]}
    </span>
  )
}
