import type { Product } from '../types'
import { ProductSchema, ProductsResponseSchema } from '../types'

const BASE_URL = 'https://dummyjson.com'


const STORAGE_KEY = 'my_products'

const loadProductsFromStorage = (): Product[] => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error('Ошибка загрузки', e)
    }
  }
  return []
}

const saveProductsToStorage = (products: Product[]) => {
  const cleanProducts = products.map(({ _isNew, _updated, _deleted, ...product }) => product)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanProducts))
}

let isInitialized = false
let cachedProducts: Product[] = []

const initializeProducts = async () => {
  if (isInitialized) return cachedProducts
  
  const localProducts = loadProductsFromStorage()
  if (localProducts.length > 0) {
    cachedProducts = localProducts
    isInitialized = true
    return cachedProducts
  }
  
  try {
    const res = await fetch(`${BASE_URL}/products?limit=20`)
    const data = await res.json()
    const validated = ProductsResponseSchema.parse(data)
    cachedProducts = validated.products
    saveProductsToStorage(cachedProducts)
    isInitialized = true
    return cachedProducts
  } catch (error) {
    console.error('Ошибка загрузки', error)
    cachedProducts = []
    return []
  }
}

export const fetchProducts = async (category?: string): Promise<Product[]> => {
  await initializeProducts()
  
  let filtered = cachedProducts
  if (category) {
    filtered = cachedProducts.filter(p => p.category === category)
  }
  
  return filtered
}

export const fetchProduct = async (id: number): Promise<Product> => {
  await initializeProducts()
  
  const product = cachedProducts.find(p => p.id === id)
  if (!product) throw new Error('Товар не найден')
  
  return product
}

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  await initializeProducts()
  
  const maxId = Math.max(...cachedProducts.map(p => p.id), 0)
  const newProduct: Product = {
    ...product,
    id: maxId + 1,
  }
  
  cachedProducts.push(newProduct)
  saveProductsToStorage(cachedProducts)
  
  return newProduct
}

export const updateProduct = async (product: Product): Promise<Product> => {
  await initializeProducts()
  
  const index = cachedProducts.findIndex(p => p.id === product.id)
  if (index !== -1) {
    cachedProducts[index] = product
    saveProductsToStorage(cachedProducts)
  }
  
  return product
}

export const deleteProduct = async (id: number): Promise<void> => {
  await initializeProducts()
  
  cachedProducts = cachedProducts.filter(p => p.id !== id)
  saveProductsToStorage(cachedProducts)
}

export const resetToServerData = async () => {
  const res = await fetch(`${BASE_URL}/products?limit=20`)
  const data = await res.json()
  const validated = ProductsResponseSchema.parse(data)
  cachedProducts = validated.products
  saveProductsToStorage(cachedProducts)
  isInitialized = true
  return cachedProducts
}