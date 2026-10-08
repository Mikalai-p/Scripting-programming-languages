import { useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { z } from 'zod'
import { fetchProducts } from '../api/products'
import { ProductCard } from '../components/ProductCard'
import { ProductForm } from '../components/ProductForm'
import {
  cartState,
  favoritesState,
  localProductsState,
  productListClassSelector,
  productsCacheState,
  uiSettingsState,
} from '../store/atoms'
import type { Product } from '../types'

const CatalogSearchSchema = z.object({
  category: z.string().optional(),
})


export const Route = createFileRoute('/catalog')({
  beforeLoad: () => {
    const user = localStorage.getItem('authUser')
    if (!user) {
      throw redirect({ to: '/login' })
    }
  },
  validateSearch: (search: Record<string, unknown>) => CatalogSearchSchema.parse(search),
  component: CatalogPage,
})

const CATEGORIES = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'furniture']

function CatalogPage() {
  const { category } = Route.useSearch()
  const navigate = Route.useNavigate()

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined)

  const [{ viewMode, theme }, setUi] = useRecoilState(uiSettingsState)
  const { containerStyle, cardStyle } = useRecoilValue(productListClassSelector)
  const setProductsCache = useSetRecoilState(productsCacheState)
  
  const [localProducts, setLocalProducts] = useRecoilState(localProductsState)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  
  const { data: serverProducts, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    staleTime: 60_000,
    gcTime: 300_000,
  })

    useEffect(() => {
    if (serverProducts && !isDataLoaded) {
      setLocalProducts(serverProducts)
      setProductsCache(serverProducts)
      setIsDataLoaded(true)
    }
  }, [serverProducts, setLocalProducts, setProductsCache, isDataLoaded])

  const displayedProducts = category
    ? localProducts.filter(product => product.category === category)
    : localProducts

  const handleAddProduct = (newProduct: Product) => {
    setLocalProducts(prev => [newProduct, ...prev])
  }

  const handleUpdateProduct = (updatedProduct: Product) => {
    setLocalProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    )
  }


  const handleDeleteProduct = (id: number) => {
    setLocalProducts(prev => prev.filter(p => p.id !== id))
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingProduct(undefined)
    setShowForm(true)
  }

  const handleCategoryChange = (cat: string | undefined) => {
    navigate({ search: cat ? { category: cat } : {} })
  }

  const clearAllClientState = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(favoritesState)
        reset(cartState)
        reset(localProductsState)
      },
    []
  )

  const handleFormSuccess = (savedProduct: Product) => {
    if (editingProduct) {
      handleUpdateProduct(savedProduct)
    } else {
      handleAddProduct(savedProduct)
    }
    setShowForm(false)
    setEditingProduct(undefined)
  }

  const isDark = theme === 'dark'
  const isPurple = theme === 'purple'

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'sans-serif', 
      minHeight: '100vh', 
      background: isDark ? '#1e1e1e' : isPurple ? '#9c03fb': '#fff',  
      color: isDark ? '#eee' : isPurple ? '#000' : '#000',              
    }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        borderBottom: '1px solid #ccc', 
        paddingBottom: '10px', 
        marginBottom: '20px', 
        flexWrap: 'wrap', 
        gap: '10px' 
      }}>
        <h2>Каталог товаров</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <span style={{ fontSize: '13px' }}>Вид:</span>
          <button onClick={() => setUi((s) => ({ ...s, viewMode: 'grid' }))} style={{ fontWeight: viewMode === 'grid' ? 'bold' : 'normal' }}>
            Сетка
          </button>
          <button onClick={() => setUi((s) => ({ ...s, viewMode: 'list' }))} style={{ fontWeight: viewMode === 'list' ? 'bold' : 'normal' }}>
            Список
          </button>
         <span style={{ marginLeft: '12px', fontSize: '13px' }}>Тема:</span>
<button onClick={() => setUi((s) => ({ ...s, theme: 'light' }))} style={{ fontWeight: theme === 'light' ? 'bold' : 'normal' }}>
  Светлая
</button>
<button onClick={() => setUi((s) => ({ ...s, theme: 'dark' }))} style={{ fontWeight: theme === 'dark' ? 'bold' : 'normal' }}>
  Тёмная
  </button>
  <button onClick={() => setUi((s) => ({ ...s, theme: 'purple' }))} style={{ fontWeight: theme === 'purple' ? 'bold' : 'normal' }}>
  Фиолетовая
  </button>
          <button onClick={clearAllClientState} style={{ marginLeft: '12px', background: '#ff5722', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px' }}>
            Очистить всё
          </button>
          <button onClick={handleAddNew} style={{ marginLeft: '12px' }}>+ Добавить товар</button>
        </div>
      </header>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span>Фильтр: </span>
        <button onClick={() => handleCategoryChange(undefined)}>Все</button>
        {CATEGORIES.map((cat) => (
          <button 
            key={cat} 
            onClick={() => handleCategoryChange(cat)} 
            style={{ fontWeight: category === cat ? 'bold' : 'normal' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {showForm && (
        <ProductForm 
          productToEdit={editingProduct} 
          onClose={() => {
            setShowForm(false)
            setEditingProduct(undefined)
          }}
          onSuccess={handleFormSuccess}
        />
      )}

      {isLoading && !isDataLoaded && <p>Загрузка данных с сервера...</p>}

      {isError && (
        <p style={{ color: 'red' }}>
          {(error as Error).message === 'Ошибка структуры данных'
            ? 'Ошибка структуры данных'
            : 'Ошибка загрузки. Попробуйте позже.'}
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {displayedProducts.length === 0 ? (
            <p>Нет товаров в этой категории. {!category && 'Добавьте первый товар!'}</p>
          ) : (
            <div style={containerStyle}>
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cardStyle={cardStyle}
                  onEdit={handleEdit}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}