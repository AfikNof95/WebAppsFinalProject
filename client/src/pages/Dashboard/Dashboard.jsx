import { Box, Container } from "@mui/system";
import DashboardNavigation from "../../components/DashboardNavigation/DashboardNavigation";
import DashboardUsers from "../../components/DashboardUsers/DashboardUsers";
import { useEffect, useState } from "react";
import backendAPI from "../../api";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import DashboardProducts from "../../components/DashboardProducts/DashboardProducts";

const DashboardPage = (props) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState({ name: "users" });
  useEffect(() => {
    if (!currentUser) {
      navigate({ pathname: "/login" });
    }
    const fetchIsAdmin = async () => {
      try {
        await backendAPI.admin.user.isAdmin(currentUser.idToken);
        setCurrentPage({
          name: "users",
          element: (
            <DashboardUsers token={currentUser.idToken}></DashboardUsers>
          ),
        });
        setIsLoading(false);
      } catch (ex) {}
    };

    fetchIsAdmin();
  }, [currentUser, navigate]);

  const handlePageClick = (pageName) => {
    setCurrentPage(() => {
      switch (pageName.toLowerCase()) {
        case "users":
          return {
            name: "users",
            element: (
              <DashboardUsers token={currentUser.idToken}></DashboardUsers>
            ),
          };
        case "products":
          return {
            name: "products",
            element: (
              <DashboardProducts
                token={currentUser.idToken}
              ></DashboardProducts>
            ),
          };
        default:
          return {
            name: "users",
            element: (
              <DashboardUsers token={currentUser.idToken}></DashboardUsers>
            ),
          };
      }
    });
  };

  return (
    !isLoading && (
      <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"}>
        <DashboardNavigation
          selectedPage={currentPage.name}
          handlePageClick={handlePageClick}
        ></DashboardNavigation>
        {currentPage.element}
      </Box>
    )
  );
};

export default DashboardPage;
