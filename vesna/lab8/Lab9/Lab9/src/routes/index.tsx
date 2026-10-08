import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Магазин товаров</h1>
      <p>Лабораторная работа №9 — TanStack Router + Query + Zod</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Link to="/catalog">
          <button>Перейти в каталог</button>
        </Link>
        <Link to="/login">
          <button>Войти / Зарегистрироваться</button>
        </Link>
      </div>
    </div>
  )
}
