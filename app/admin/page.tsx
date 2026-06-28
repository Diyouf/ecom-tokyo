import Link from 'next/link'
import { getProducts } from '@/lib/data'
import { ProductTable } from '@/components/admin/ProductTable'
import { Plus, Package, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react'
import { formatPrice } from '@/lib/whatsapp'

export const metadata = { title: 'Dashboard' }

export default async function AdminDashboardPage() {
  const products = await getProducts()

  const totalProducts = products.length
  const outOfStock = products.filter((p) => p.stock === 0).length
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const featured = products.filter((p) => p.featured).length

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Total Stock Value', value: formatPrice(totalValue), icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Featured', value: featured, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Low / Out of Stock', value: `${lowStock} / ${outOfStock}`, icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ]

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white/40 mt-1">Manage your product catalogue</p>
        </div>
        <Link
          href="/admin/products/new"
          id="admin-add-product"
          className="btn-primary flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="glass-card p-5">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-white/40 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Products table */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-bold text-white text-lg">All Products</h2>
          <span className="text-white/40 text-sm">{totalProducts} items</span>
        </div>
        <ProductTable products={products} />
      </div>

      {/* Quick links */}
      <div className="flex gap-4">
        <Link href="/" target="_blank" className="btn-ghost text-sm">
          View Store →
        </Link>
      </div>
    </div>
  )
}
