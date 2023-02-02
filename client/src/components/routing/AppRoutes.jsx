import Checkout from '../Checkout/Checkout';
import CartPage from '../../pages/Cart/Cart';
import Homepage from '../Homepage/Homepage';
import NotFound from '../NotFound/NotFound';

import AuthForm from '../Auth/Login';
import ProductPage from '../ProductPage/ProductPage';
import AccountPage from '../Account/Account';
import ProfilePage from '../Profile/Profile';
import DashboardPage from '../../pages/Dashboard/Dashboard';
import UnauthorizedPage from '../../pages/401/401';
import NotFoundPage from '../../pages/404/404';
import ProtectedRoute from './ProtectedRoute.js';

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
    element: <div></div> // Will be
  },
  {
    path: '/about',
    element: '' // Will be
  },
  {
    path: '/dashboard',
    element: <DashboardPage></DashboardPage>
  },
  {
    path: '/401',
    element: <UnauthorizedPage></UnauthorizedPage>
  },
  {
    path: '/product/:productId',
    element: <ProductPage></ProductPage>
  },
  {
    path: '*',
    element: (
      <>
        <NotFoundPage></NotFoundPage>
      </>
    )
  }
];

export default appRoutes;
