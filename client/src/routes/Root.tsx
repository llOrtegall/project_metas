import { ThemeProvider } from '../context/ThemeContext';
import { Loading } from '../components/Loading';
import { useAuth } from '../auth/AuthContext';
import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'sonner';

const LoginPage = lazy(() => import('../pages/LoginForm'))
const NavBar = lazy(() => import('../components/NavBar'))
const InfoSucursal = lazy(() => import('../components/InfoPdvComponent'))

export default function Root() {
  const { profileData } = useAuth()

  if (!profileData?.sucursal || !profileData?.user) return (
    <Suspense fallback={<Loading />}>
      <LoginPage />
    </Suspense>
  )

  return (
    <ThemeProvider>
      <Suspense fallback={<Loading />}>
        <nav className='w-3/12 bg-slate-100 dark:bg-slate-900'>
          <NavBar />
        </nav>
        <main className='w-9/12  overflow-y-auto'>
          <InfoSucursal />
          <Outlet />
        </main>
      </Suspense>
      <Toaster richColors position='top-right' />
    </ThemeProvider>
  )

}