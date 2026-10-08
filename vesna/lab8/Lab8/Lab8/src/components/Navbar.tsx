import { Link } from '@tanstack/react-router'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <nav style={{ borderBottom: '1px solid #ccc', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'sans-serif', background: '#fff' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>Главная</Link>
        {isAuthenticated && (
          <Link to="/catalog" style={{ textDecoration: 'none', color: '#000' }}>Каталог</Link>
        )}
                  <Link to="/about" style={{ textDecoration: 'none', color: '#000' }}>О нас</Link>
      </div>
      <div>
        {isAuthenticated ? (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px' }}>{user?.email}</span>
            <button onClick={logout}>Выйти</button>
          </div>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: '#000' }}>Войти</Link>
        )}
      </div>
    </nav>
  )
}
