import { NextRequest, NextResponse } from 'next/server'
import { getProducts, createProduct } from '@/lib/data'
import { ProductFormData } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let products = await getProducts()
    if (category && category !== 'all') {
      products = products.filter((p) => p.category === category)
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error('GET /api/products error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin auth
    const adminToken = request.cookies.get('admin_token')?.value
    if (!adminToken || adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data: ProductFormData = {
      name: body.name,
      description: body.description,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      category: body.category,
      imageUrl: body.imageUrl,
      stock: Number(body.stock),
      featured: Boolean(body.featured),
      tags: body.tags ?? [],
    }

    const product = await createProduct(data)
    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('POST /api/products error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
