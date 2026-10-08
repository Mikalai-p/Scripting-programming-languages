import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navbar } from '../components/Navbar'
import { AuthProvider } from '../context/AuthContext'

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </AuthProvider>
  ),
})
