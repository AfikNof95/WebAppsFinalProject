import { Box, Container } from "@mui/system";
import DashboardNavigation from "../../components/DashboardNavigation/DashboardNavigation";
import DashboardUsers from "../../components/DashboardUsers/DashboardUsers";
import { useEffect, useState } from "react";
import firebaseAPI from "../../context/firebase";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import DashboardProducts from "../../components/DashboardProducts/DashboardProducts";

const DashboardPage = (props) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    <DashboardUsers token={currentUser.idToken}></DashboardUsers>
  );
  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        await firebaseAPI.admin.user.isAdmin(currentUser.idToken);
        setIsLoading(false);
      } catch (ex) {
        navigate({ pathname: "/401" });
      }
    };

    fetchIsAdmin();
  }, [navigate, currentUser]);

  const handlePageClick = (pageName) => {
    setCurrentPage(() => {
      switch (pageName.toLowerCase()) {
        case "users":
          return <DashboardUsers token={currentUser.idToken}></DashboardUsers>;
        case "products":
          return (
            <DashboardProducts token={currentUser.idToken}></DashboardProducts>
          );
        default:
          return <DashboardUsers token={currentUser.idToken}></DashboardUsers>;
      }
    });
  };

  return (
    !isLoading && (
      <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"}>
        <DashboardNavigation
          handlePageClick={handlePageClick}
        ></DashboardNavigation>
        {currentPage}
      </Box>
    )
  );
};

export default DashboardPage;
