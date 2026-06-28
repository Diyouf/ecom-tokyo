import { ProductForm } from '@/components/admin/ProductForm'

export const metadata = { title: 'Add Product' }

export default function NewProductPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Add New Product</h1>
        <p className="text-white/40 mt-1">Fill in the details to add a product to your store</p>
      </div>
      <ProductForm mode="create" />
    </div>
  )
}
