import Checkout from "../Checkout/Checkout";
import CartPage from "../../pages/Cart/Cart";
import Homepage from "../Homepage/Homepage";
import NotFound from "../NotFound/NotFound";

import AuthForm from "../Auth/Login"
import ProductPage from "../ProductPage/ProductPage";
import AccountPage from "../Account/Account";
import ProfilePage from "../Profile/Profile";
import DashboardPage from "../../pages/Dashboard/Dashboard";


const appRoutes = [
  { path: "/", element: <Homepage />, exact: true },
  {
    path: "/login",
    element: <AuthForm />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/account",
    element: <AccountPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/categories",
    element: <div></div>, // Will be
  },
  {
    path: "/about",
    element: "", // Will be
  },
  {
    path: "/dashboard",
    element: <DashboardPage></DashboardPage>,
  },
  {
    path: "/401",
    element: <div>Unauthorized</div>,
  },
  {
    path:"/product/:id",
    element: <ProductPage></ProductPage>
  },
  {
    path: "*",
    element: (
      <>
        <div style={{ paddingTop: "100px" }}>{<NotFound />}</div>
      </>
    ),
  },
];

export default appRoutes
