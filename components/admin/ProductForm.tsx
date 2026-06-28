'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Product, Category } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES: Exclude<Category, 'all'>[] = [
  'retro',
  'world-cup',
  'football-club',
  'intl-football',
  'ipl',
  'cricket',
  'croptops',
  'f1',
  'basketball',
]

interface ProductFormProps {
  mode: 'create' | 'edit'
  product?: Product
}

export function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product?.price?.toString() ?? '',
    originalPrice: product?.originalPrice?.toString() ?? '',
    category: product?.category ?? 'retro',
    imageUrl: product?.imageUrl ?? '',
    stock: product?.stock?.toString() ?? '',
    featured: product?.featured ?? false,
    tags: product?.tags?.join(', ') ?? '',
  })

  const update = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      category: form.category,
      imageUrl: form.imageUrl,
      stock: Number(form.stock),
      featured: form.featured,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    }

    try {
      const url = mode === 'create' ? '/api/products' : `/api/products/${product!.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* Back */}
      <Link href="/admin" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      {/* Image */}
      <div className="glass-card p-6">
        <ImageUpload
          value={form.imageUrl}
          onChange={(url) => update('imageUrl', url)}
          label="Product Image"
        />
      </div>

      {/* Basic info */}
      <div className="glass-card p-6 space-y-6">
        <h2 className="font-semibold text-white text-lg">Product Details</h2>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Product Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="e.g. Pro Strike Football Boots"
            className="input-field"
            required
            id="product-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Description <span className="text-primary">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Describe the product features..."
            rows={4}
            className="input-field resize-none"
            required
            id="product-description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Category <span className="text-primary">*</span></label>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className="input-field"
            required
            id="product-category"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-dark capitalize">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Tags <span className="text-white/30">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update('tags', e.target.value)}
            placeholder="e.g. boots, cleats, grass"
            className="input-field"
            id="product-tags"
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="glass-card p-6 space-y-6">
        <h2 className="font-semibold text-white text-lg">Pricing & Stock</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Selling Price (₹) <span className="text-primary">*</span>
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => update('price', e.target.value)}
              placeholder="4999"
              min="0"
              step="1"
              className="input-field"
              required
              id="product-price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Original Price (₹) <span className="text-white/30">(optional, for discount)</span>
            </label>
            <input
              type="number"
              value={form.originalPrice}
              onChange={(e) => update('originalPrice', e.target.value)}
              placeholder="6499"
              min="0"
              step="1"
              className="input-field"
              id="product-original-price"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Stock Quantity <span className="text-primary">*</span>
          </label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => update('stock', e.target.value)}
            placeholder="10"
            min="0"
            step="1"
            className="input-field"
            required
            id="product-stock"
          />
        </div>

        {/* Featured toggle */}
        <div className="flex items-center justify-between p-4 bg-dark-100 rounded-xl border border-white/5">
          <div>
            <div className="font-medium text-white text-sm">Featured Product</div>
            <div className="text-white/40 text-xs mt-0.5">Show in the &quot;Top Picks&quot; section on the home page</div>
          </div>
          <button
            type="button"
            id="product-featured-toggle"
            onClick={() => update('featured', !form.featured)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              form.featured ? 'bg-primary' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                form.featured ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button type="submit" loading={loading} size="lg" id="product-form-submit">
          <Save className="w-4 h-4" />
          {mode === 'create' ? 'Create Product' : 'Save Changes'}
        </Button>
        <Link href="/admin" className="btn-ghost py-4 px-6">
          Cancel
        </Link>
      </div>
    </form>
  )
}
