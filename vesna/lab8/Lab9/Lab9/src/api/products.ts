import type { Product } from '../types'
import { ProductSchema, ProductsResponseSchema } from '../types'

const BASE_URL = 'https://dummyjson.com'

export const fetchProducts = async (category?: string): Promise<Product[]> => {
  const url = category
    ? `${BASE_URL}/products/category/${category}?limit=8`
    : `${BASE_URL}/products?limit=8`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Ошибка загрузки товаров')

  const data = await res.json()

  try {
    const validated = ProductsResponseSchema.parse(data)
    return validated.products
  } catch {
    throw new Error('Ошибка структуры данных')
  }
}

export const fetchProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error('Товар не найден')

  const data = await res.json()

  try {
    return ProductSchema.parse(data)
  } catch {
    throw new Error('Ошибка структуры данных')
  }
}

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!res.ok) throw new Error('Ошибка добавления товара')
  const data = await res.json()
  return ProductSchema.parse(data)
}

export const updateProduct = async (product: Product): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${product.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!res.ok) throw new Error('Ошибка обновления товара')
  const data = await res.json()
  return ProductSchema.parse(data)
}

export const deleteProduct = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Ошибка удаления товара')
}
