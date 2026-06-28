export type Category =
  | 'all'
  | 'retro'
  | 'world-cup'
  | 'football-club'
  | 'intl-football'
  | 'ipl'
  | 'cricket'
  | 'croptops'
  | 'f1'
  | 'basketball'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: Exclude<Category, 'all'>
  imageUrl: string
  stock: number
  featured: boolean
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface AdminSession {
  authenticated: boolean
  expiresAt: number
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
