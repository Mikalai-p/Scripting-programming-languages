import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { deleteProduct, fetchProducts } from '../api/products'
import { ProductForm } from '../components/ProductForm'
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

  // validateSearch + Zod: строгая типизация URL-параметров (?category=smartphones)
  validateSearch: (search: Record<string, unknown>) => CatalogSearchSchema.parse(search),

  component: CatalogPage,
})

const CATEGORIES = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'furniture']

function CatalogPage() {
  // useSearch — читаем Search Params из URL, типизированные через Zod
  const { category } = Route.useSearch()
  const navigate = Route.useNavigate()

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined)
  const queryClient = useQueryClient()

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
    staleTime: 60_000,
    gcTime: 300_000,
  })

const deleteMutation = useMutation({
  mutationFn: deleteProduct,

  onMutate: async (id: number) => {
    await queryClient.cancelQueries({ queryKey: ['products', category] })
    const previousProducts = queryClient.getQueryData<Product[]>(['products', category])
    queryClient.setQueryData<Product[]>(['products', category], (old) =>
      old?.filter((p) => p.id !== id) ?? []
    )
    return { previousProducts }
  },

  onError: (_err, _id, context) => {
    queryClient.setQueryData(['products', category], context?.previousProducts)
    alert('Ошибка удаления!')
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
    queryClient.invalidateQueries({ queryKey: ['products', category] })
  },
})

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

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2>Каталог товаров</h2>
        <button onClick={handleAddNew}>+ Добавить товар</button>
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
        <ProductForm productToEdit={editingProduct} onClose={() => setShowForm(false)} />
      )}

      {isLoading && <p>Загрузка данных с сервера...</p>}

      {isError && (
        <p style={{ color: 'red' }}>
          {(error as Error).message === 'Ошибка структуры данных'
            ? 'Ошибка структуры данных'
            : 'Ошибка загрузки. Попробуйте позже.'}
        </p>
      )}

      {!isLoading && !isError && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {products?.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
              <h4>{product.title}</h4>
              <p>Цена: ${product.price}</p>
              {product.category && <p style={{ fontSize: '12px', color: '#666' }}>{product.category}</p>}
              <Link to="/product/$id" params={{ id: String(product.id) }}>
                <button style={{ marginRight: '5px' }}>Детали</button>
              </Link>
              <button onClick={() => handleEdit(product)} style={{ marginRight: '5px' }}>Изменить</button>
              <button onClick={() => deleteMutation.mutate(product.id!)} style={{ color: 'red' }}>Удалить</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
