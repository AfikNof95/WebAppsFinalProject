import Checkout from '../Checkout/Checkout'
import CartPage from '../../pages/Cart/Cart'
import Homepage from '../Homepage/Homepage'
import AuthForm from '../Auth/Login'
import ProductPage from '../Productpage/Productpage'
import AccountPage from '../Account/Account'
import ProfilePage from '../Profile/Profile'

const appRoutes = [
    { path: '/', element: <Homepage />, exact: true },
    {
        path: '/login',
        element: <AuthForm />,
    },
    {
        path: '/checkout',
        element: <Checkout />,
    },
    {
        path: '/cart',
        element: <CartPage />,
    },
    {
        path: '/account',
        element: <AccountPage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />,
    },
    {
        path: '/categories',
        element: '', // Will be
    },
    {
        path: '/about',
        element: '', // Will be
    },
    {
        path: '/product/:id',
        element: <ProductPage />,
    },
]

export default appRoutes
