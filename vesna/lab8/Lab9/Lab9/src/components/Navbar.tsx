import { Link } from '@tanstack/react-router'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useAuth } from '../context/AuthContext'
import { cartCountState, uiSettingsState } from '../store/atoms'

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const cartCount = useRecoilValue(cartCountState)
  const { theme } = useRecoilValue(uiSettingsState)

  const resetSettings = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(uiSettingsState)
      },
    []
  )

  const isDark = theme === 'dark'
  const isPurple = theme === 'purple'
  

  return (
    <nav style={{
      borderBottom: '1px solid #ccc',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      background: isDark ? '#222' : isPurple ? '#9c03fb': '#fff',
      color: isDark ? '#eee' : '#000',
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Главная</Link>
        {isAuthenticated && (
          <Link to="/catalog" style={{ textDecoration: 'none', color: 'inherit' }}>Каталог</Link>
        )}
        {isAuthenticated && (
          <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Корзина
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-14px',
                background: '#e91e63',
                color: '#fff',
                borderRadius: '50%',
                minWidth: '18px',
                height: '18px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        )}
              </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button onClick={resetSettings} title="Сбросить настройки UI">Сбросить настройки</button>
        {isAuthenticated ? (
          <>
            <span style={{ fontSize: '14px' }}>{user?.email}</span>
            <button onClick={logout}>Выйти</button>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Войти</Link>
        )}
      </div>
    </nav>
  )
}
