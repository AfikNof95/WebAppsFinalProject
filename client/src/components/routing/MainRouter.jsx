import { Route, Routes } from "react-router";
import Navbar from "../Navbar/Navbar";
import appRoutes from "./AppRoutes";

const MainRouter = () => {
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route
          key={`Route - ${route.path}`}
          path={route.path}
          exact={route.exact}
          element={
            <>
              {<Navbar />}
              {route.element}
            </>
          }
        />
      ))}
    </Routes>
  );
};

export default MainRouter;
