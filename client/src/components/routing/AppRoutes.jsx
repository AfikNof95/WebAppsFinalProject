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
