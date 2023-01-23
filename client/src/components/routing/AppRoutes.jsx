import Checkout from "../Checkout/Checkout";
import CartPage from "../../pages/Cart/Cart";
import Homepage from "../Homepage/Homepage";
import NotFound from "../NotFound/NotFound";
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
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/categories",
    element: "", // Will be
  },
  {
    path: "/about",
    element: "", // Will be
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

export default appRoutes;
