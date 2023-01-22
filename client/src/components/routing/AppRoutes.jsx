import Checkout from "../../pages/Checkout/Checkout";
import CartPage from "../../pages/Cart/Cart";
import Homepage from "../Homepage/Homepage";
import NotFound from "../NotFound/NotFound";
import NewCheckout from "../../pages/NewCheckout/NewCheckout";
import AuthForm from "../Auth/Login";

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
    path: "/NewCheckout",
    element: <NewCheckout />,
  },
  {
    path: "/cart",
    element: <CartPage></CartPage>,
  },
  {
    path: "*",
    element: (
      <>
        <div style={{ paddingTop: "100px" }}></div>
        {<NotFound />}
      </>
    ),
  },
];

export default appRoutes;
