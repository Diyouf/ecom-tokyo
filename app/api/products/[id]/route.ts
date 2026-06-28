import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '@/lib/data'

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const product = await getProductById(id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ product })
  } catch (error) {
    console.error('GET /api/products/[id] error:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const adminToken = request.cookies.get('admin_token')?.value
    if (!adminToken || adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()
    const updated = await updateProduct(id, {
      name: body.name,
      description: body.description,
      price: body.price !== undefined ? Number(body.price) : undefined,
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      category: body.category,
      imageUrl: body.imageUrl,
      stock: body.stock !== undefined ? Number(body.stock) : undefined,
      featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
      tags: body.tags,
    })

    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ product: updated })
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const adminToken = request.cookies.get('admin_token')?.value
    if (!adminToken || adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const deleted = await deleteProduct(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
