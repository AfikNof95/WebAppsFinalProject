import Checkout from "../Checkout/Checkout";
import CartPage from "../../pages/Cart/Cart";
import Homepage from "../Homepage/Homepage";
import NotFound from "../NotFound/NotFound";

const appRoutes = [
  { path: "/", element: <Homepage />, exact: true },
  {
    path: "/auth",
    element: <div style={{ paddingTop: "100px" }}>To Do Auth</div>,
  },
  {
    path: "/login",
    element: <div style={{ paddingTop: "100px" }}>To Do login</div>,
  },
  {
    path: "/checkout",
    element: <Checkout />,
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
