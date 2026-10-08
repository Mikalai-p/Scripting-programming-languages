import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  cartProductsSelector,
  cartState,
  cartTotalSelector,
  localProductsState,
  uiSettingsState,
} from '../store/atoms'

export const Route = createFileRoute('/cart')({
  beforeLoad: () => {
    const user = localStorage.getItem('authUser')
    if (!user) throw redirect({ to: '/login' })
  },
  component: CartPage,
})

function CartPage() {
  const rows = useRecoilValue(cartProductsSelector)
  const total = useRecoilValue(cartTotalSelector)
  const setCart = useSetRecoilState(cartState)
  const { theme } = useRecoilValue(uiSettingsState)
  const localProducts = useRecoilValue(localProductsState)
  const isDark = theme === 'dark'
  const isPurple = theme === 'purple'
  
  useEffect(() => {

    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
  
    const validCartItems = currentCart.filter((item: { id: number }) => 
      localProducts.some(product => product.id === item.id)
    )
    if (validCartItems.length !== currentCart.length) {
      setCart(validCartItems)
    }
  }, [localProducts, setCart])
  
  const clearCart = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(cartState)
      },
    []
  )

  const inc = (id: number) =>
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c)))

  const dec = (id: number) =>
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0)
    )

  const remove = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id))



  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'sans-serif', 
      minHeight: '100vh', 
      background: isDark ? '#222' : isPurple ? '#9c03fb': '#fff', 
      color: isDark ? '#eee' : isPurple ? '#000' : '#000' 
    }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #ccc', 
        paddingBottom: '10px', 
        marginBottom: '20px' 
      }}>
        <h2>Корзина</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/catalog">
            <button>В каталог</button>
          </Link>
          <button 
            onClick={clearCart} 
            style={{ 
              background: '#ff5722', 
              color: '#fff', 
              border: 'none', 
              padding: '6px 12px', 
              borderRadius: '4px' 
            }}
          >
            Очистить всё
          </button>
        </div>
      </header>

      {rows.length === 0 ? (
        <p>
          Корзина пуста. Перейдите в <Link to="/catalog">каталог</Link>, чтобы добавить товары.
        </p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {rows.map((row) => (
              <div 
                key={row.id} 
                style={{ 
                  border: '1px solid #ccc', 
                  borderColor: isDark ? '#555' : '#ccc', 
                  borderRadius: '8px', 
                  padding: '12px', 
                  display: 'flex', 
                  gap: '15px', 
                  alignItems: 'center', 
                  background: isDark ? '#222' : isPurple ? '#9c03fb': '#fff' 
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0' }}>{row.title}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#eee' : isPurple ? '#000' : '#000' }}>
                    ${row.price} × {row.quantity} = <strong>${row.subtotal.toFixed(2)}</strong>
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button onClick={() => dec(row.id)}>-</button>
                  <span style={{ minWidth: '24px', textAlign: 'center' }}>{row.quantity}</span>
                  <button onClick={() => inc(row.id)}>+</button>
     
                  <button 
                    onClick={() => remove(row.id)} 
                    style={{ color: 'red', marginLeft: '10px' }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            borderTop: '2px solid #ccc', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <strong style={{ fontSize: '18px' }}>Итого: ${total.toFixed(2)}</strong>
            <button style={{ 
              background: '#4caf50', 
              color: '#fff', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  )
}