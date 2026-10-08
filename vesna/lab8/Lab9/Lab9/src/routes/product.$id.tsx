import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '../api/products'

export const Route = createFileRoute('/product/$id')({
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { id } = Route.useParams()

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(Number(id)),
  })

  if (isLoading) {
    return <p style={{ padding: '20px', fontFamily: 'sans-serif' }}>Загрузка товара...</p>
  }

  if (isError) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <p style={{ color: 'red' }}>
          {(error as Error).message === 'Ошибка структуры данных'
            ? 'Ошибка структуры данных'
            : 'Товар не найден'}
        </p>
        <Link to="/catalog"><button>Вернуться в каталог</button></Link>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', fontFamily: 'sans-serif' }}>
      <Link to="/catalog"><button style={{ marginBottom: '20px' }}>Назад в каталог</button></Link>
      {product && (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          {product.thumbnail && (
            <img src={product.thumbnail} alt={product.title} style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', marginBottom: '15px' }} />
          )}
          <h2>{product.title}</h2>
          <p><strong>Цена:</strong> ${product.price}</p>
          {product.category && <p><strong>Категория:</strong> {product.category}</p>}
          {product.description && <p>{product.description}</p>}
          <p style={{ fontSize: '12px', color: '#999' }}>ID: {product.id}</p>
        </div>
      )}
    </div>
  )
}
