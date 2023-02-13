import About from '../About/About';
import AccountPage from '../Account/Account';
import AuthForm from '../Auth/Login';
import CartPage from '../../pages/Cart/Cart';
import Checkout from '../Checkout/Checkout';
import DashboardPage from '../../pages/Dashboard/Dashboard';
import Homepage from '../Homepage/Homepage';
import NotFoundPage from '../../pages/404/404';
import ProductPage from '../ProductPage/ProductPage';
import ProfilePage from '../Profile/Profile';
import ProtectedRoute from './ProtectedRoute.js';
import UnauthorizedPage from '../../pages/401/401';
import CategoriesPage from '../../pages/Categories/Categories';

const appRoutes = [
  { path: '/', element: <Homepage />, exact: true },
  {
    path: '/login',
    element: <AuthForm />
  },
  {
    path: '/checkout',
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    )
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/account',
    element: (
      <ProtectedRoute>
        <AccountPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    )
  },
  {
    path: '/categories',
    element: <CategoriesPage></CategoriesPage> // Will be
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/401',
    element: <UnauthorizedPage />
  },
  {
    path: '/product/:productId',
    element: <ProductPage />
  },
  {
    path: '*',
    element: (
      <>
        <NotFoundPage />
      </>
    )
  }
];

export default appRoutes;
