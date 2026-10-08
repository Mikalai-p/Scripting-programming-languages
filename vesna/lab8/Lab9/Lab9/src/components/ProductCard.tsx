import { Link } from '@tanstack/react-router'
import { memo } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cartState, favoritesState, uiSettingsState } from '../store/atoms'
import type { Product } from '../types'

interface Props {
  product: Product
  cardStyle: React.CSSProperties
  onEdit: (p: Product) => void
  onDelete: (id: number) => void
}

export const ProductCard = memo(function ProductCard({ product, cardStyle, onEdit, onDelete }: Props) {
  const { viewMode, theme } = useRecoilValue(uiSettingsState)
  const setCart = useSetRecoilState(cartState)
  const setFavorites = useSetRecoilState(favoritesState)
  const favorites = useRecoilValue(favoritesState)
  const isFav = favorites.includes(product.id)

  const toggleFav = () => {
    setFavorites((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    )
  }

  const addToCart = () => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id)
      if (existing) {
        return prev.map((c) => (c.id === product.id ? { ...c, quantity: c.quantity + 1 } : c))
      }
      return [...prev, { id: product.id, quantity: 1 }]
    })
  }
  const isDark = theme === 'dark'
  const isPurple = theme === 'purple'
  const themedStyle: React.CSSProperties = {
    ...cardStyle,
    background: isDark ? '#222' : isPurple ? '#9c03fb': '#fff' ,
    color: theme === 'dark' ? '#eee' : '#000',
    borderColor: theme === 'dark' ? '#555' : '#ccc',
  }

  return (
    <div style={themedStyle}>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 8px 0' }}>{product.title}</h4>
        <p style={{ margin: '4px 0' }}>Цена: ${product.price}</p>
        {product.category && (
          <p style={{ fontSize: '12px', color: theme === 'dark' ? '#999' : '#666', margin: '4px 0' }}>
            {product.category}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: viewMode === 'grid' ? '10px' : 0 }}>
        <button
          onClick={toggleFav}
          title="В избранное"
          style={{
            background: isFav ? '#e91e63' : 'transparent',
            color: isFav ? '#fff' : 'inherit',
            border: '1px solid #e91e63',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isFav ? 'В избранном' : 'В избранное'}
        </button>
        <button onClick={addToCart} >
          В корзину
        </button>
        <Link to="/product/$id" params={{ id: String(product.id) }}>
          <button>Детали</button>
        </Link>
        <button onClick={() => onEdit(product)}>Изменить</button>
        <button onClick={() => onDelete(product.id)} style={{ color: 'red' }}>
          Удалить
        </button>
      </div>
    </div>
  )
})
