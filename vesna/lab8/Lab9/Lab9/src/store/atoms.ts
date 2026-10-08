import { atom, selector, type AtomEffect } from 'recoil'
import type { Product } from '../types'

const localStorageEffect =
  <T,>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem(key)
    if (saved != null) {
      try {
        setSelf(JSON.parse(saved) as T)
      } catch {
      }
    }
    onSet((newValue, _old, isReset) => {
      if (isReset) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }

export type ViewMode = 'grid' | 'list'
export type Theme = 'light' | 'dark' | 'purple'


export interface UiSettings {
  viewMode: ViewMode
  theme: Theme
}

export const uiSettingsState = atom<UiSettings>({
  key: 'uiSettingsState',
  default: { viewMode: 'grid', theme: 'light' },
  effects: [localStorageEffect<UiSettings>('ui-settings')],
})

export const productListClassSelector = selector<{
  containerStyle: React.CSSProperties
  cardStyle: React.CSSProperties
}>({
  key: 'productListClassSelector',
  get: ({ get }) => {
    const { viewMode } = get(uiSettingsState)
    if (viewMode === 'grid') {
      return {
        containerStyle: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px',
        },
        cardStyle: {
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
        },
      }
    }
    return {
      containerStyle: { display: 'flex', flexDirection: 'column', gap: '10px' },
      cardStyle: {
        border: '1px solid #ccc',
        padding: '15px',
        borderRadius: '8px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      },
    }
  },
})

export const favoritesState = atom<number[]>({
  key: 'favoritesState',
  default: [],
  effects: [localStorageEffect<number[]>('favorites')],
})

export interface CartItem {
  id: number
  quantity: number
}

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect<CartItem[]>('cart')],
})

export const cartCountState = selector<number>({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).reduce((sum, item) => sum + item.quantity, 0),
})

export const productsCacheState = atom<Product[]>({
  key: 'productsCacheState',
  default: [],
})

export const localProductsState = atom<Product[]>({
  key: 'localProductsState',
  default: [],
  effects: [localStorageEffect<Product[]>('local-products')],
})

export interface CartProductRow extends Product {
  quantity: number
  subtotal: number
}

export const cartProductsSelector = selector<CartProductRow[]>({
  key: 'cartProductsSelector',
  get: ({ get }) => {
    const cart = get(cartState)
    const products = get(localProductsState) 
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.id)
        if (!product) return null
        return { ...product, quantity: item.quantity, subtotal: product.price * item.quantity }
      })
      .filter((x): x is CartProductRow => x !== null)
  },
})

export const cartTotalSelector = selector<number>({
  key: 'cartTotalSelector',
  get: ({ get }) => get(cartProductsSelector).reduce((sum, row) => sum + row.subtotal, 0),
})