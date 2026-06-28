import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/data'
import { ProductForm } from '@/components/admin/ProductForm'

interface EditProductPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: EditProductPageProps) {
  const product = await getProductById(params.id)
  return { title: product ? `Edit: ${product.name}` : 'Product Not Found' }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await getProductById(params.id)
  if (!product) notFound()

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Product</h1>
        <p className="text-white/40 mt-1 truncate">{product.name}</p>
      </div>
      <ProductForm mode="edit" product={product} />
    </div>
  )
}
