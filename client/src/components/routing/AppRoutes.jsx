import Homepage from "../Homepage/Homepage";
import NotFound from "../NotFound/NotFound";

const appRoutes = [
  { path: "/", element: <Homepage />, exact: true },
  {
    path: "/auth",
    element: <div>To Do Auth</div>,
  },
  { path: "/login", element: <div>To Do login</div> },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default appRoutes;
