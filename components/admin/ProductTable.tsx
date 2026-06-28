'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/whatsapp'
import { CategoryBadge } from '@/components/ui/Badge'
import { Edit2, Trash2, Star, AlertTriangle } from 'lucide-react'

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete product')
      }
    } catch {
      alert('Something went wrong')
    } finally {
      setDeletingId(null)
      setConfirmDelete(null)
    }
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-white/30">
        <p>No products yet.</p>
        <Link href="/admin/products/new" className="text-primary hover:underline text-sm mt-2 inline-block">
          Add your first product →
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/10">
            <th className="text-left px-6 py-4 font-medium">Product</th>
            <th className="text-left px-4 py-4 font-medium">Category</th>
            <th className="text-right px-4 py-4 font-medium">Price</th>
            <th className="text-center px-4 py-4 font-medium">Stock</th>
            <th className="text-center px-4 py-4 font-medium">Featured</th>
            <th className="text-right px-6 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-white/2 transition-colors group"
            >
              {/* Product name + image */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-dark-100 shrink-0">
                    {product.imageUrl && (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-white truncate max-w-[200px]">{product.name}</div>
                    <div className="text-white/30 text-xs truncate max-w-[200px]">{product.id}</div>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className="px-4 py-4">
                <CategoryBadge category={product.category} />
              </td>

              {/* Price */}
              <td className="px-4 py-4 text-right">
                <div className="font-semibold text-white">{formatPrice(product.price)}</div>
                {product.originalPrice && (
                  <div className="text-white/30 text-xs line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </td>

              {/* Stock */}
              <td className="px-4 py-4 text-center">
                {product.stock === 0 ? (
                  <span className="inline-flex items-center gap-1 text-red-400 text-xs font-medium">
                    <AlertTriangle className="w-3 h-3" />
                    Out
                  </span>
                ) : product.stock <= 5 ? (
                  <span className="text-orange-400 font-medium">{product.stock}</span>
                ) : (
                  <span className="text-green-400">{product.stock}</span>
                )}
              </td>

              {/* Featured */}
              <td className="px-4 py-4 text-center">
                {product.featured ? (
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 mx-auto" />
                ) : (
                  <Star className="w-4 h-4 text-white/20 mx-auto" />
                )}
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    id={`edit-${product.id}`}
                    className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>

                  {confirmDelete === product.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="px-2 py-1 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deletingId === product.id ? '...' : 'Yes'}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="px-2 py-1 text-xs bg-white/5 text-white/50 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      id={`delete-${product.id}`}
                      onClick={() => setConfirmDelete(product.id)}
                      className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
