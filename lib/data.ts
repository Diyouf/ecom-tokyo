import { Product, ProductFormData } from './types'
import fs from 'fs'
import path from 'path'
import { put, list } from '@vercel/blob'

const LOCAL_JSON_PATH = path.join(process.cwd(), 'data', 'products.json')
let products: Product[] = []
let isInitialized = false

async function initializeProducts() {
  if (isInitialized) return

  // 1. Try to load from Vercel Blob first
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
      const productBlob = blobs.find((b) => b.pathname === 'products.json')
      if (productBlob) {
        const res = await fetch(productBlob.url, { cache: 'no-store' })
        if (res.ok) {
          products = await res.json()
          isInitialized = true
          return
        }
      }
    } catch (error) {
      console.error('Failed to load products from Vercel Blob:', error)
    }
  }

  // 2. Fallback to local products.json file
  try {
    if (fs.existsSync(LOCAL_JSON_PATH)) {
      const raw = fs.readFileSync(LOCAL_JSON_PATH, 'utf-8')
      products = JSON.parse(raw)
    } else {
      products = []
    }
  } catch (error) {
    console.error('Failed to load products from local JSON:', error)
    products = []
  }
  isInitialized = true
}

async function persistProducts() {
  // 1. Save locally for local environment persistence
  let localSaveSuccess = false
  try {
    fs.writeFileSync(LOCAL_JSON_PATH, JSON.stringify(products, null, 2), 'utf-8')
    localSaveSuccess = true
  } catch (error) {
    console.error('Failed to save products locally:', error)
    // If we don't have Blob token, local save MUST succeed, otherwise we throw
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error(`Failed to save products locally: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // 2. Upload to Vercel Blob for persistent deployment
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put('products.json', JSON.stringify(products), {
        access: 'public',
        addRandomSuffix: false,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
    } catch (error) {
      console.error('Failed to upload products.json to Vercel Blob:', error)
      throw new Error(`Vercel Blob Sync Failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

export async function getProducts(): Promise<Product[]> {
  await initializeProducts()
  return products
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  await initializeProducts()
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export async function getProductById(id: string): Promise<Product | null> {
  await initializeProducts()
  return products.find((p) => p.id === id) ?? null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await initializeProducts()
  return products.filter((p) => p.featured)
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  await initializeProducts()
  const newProduct: Product = {
    ...data,
    id: `prod_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  products = [newProduct, ...products]
  await persistProducts()
  return newProduct
}

export async function updateProduct(
  id: string,
  data: Partial<ProductFormData>
): Promise<Product | null> {
  await initializeProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null

  const updated: Product = {
    ...products[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  products[index] = updated
  await persistProducts()
  return updated
}

export async function deleteProduct(id: string): Promise<boolean> {
  await initializeProducts()
  const initialLength = products.length
  products = products.filter((p) => p.id !== id)
  if (products.length < initialLength) {
    await persistProducts()
    return true
  }
  return false
}

export async function searchProducts(query: string): Promise<Product[]> {
  await initializeProducts()
  const q = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
  )
}
