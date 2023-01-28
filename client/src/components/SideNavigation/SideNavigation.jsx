import "./SideNavigation.css";
import {
  Drawer,
  Toolbar,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  CircularProgress,
  Collapse,
  Avatar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AllCategoriesIcon from "@mui/icons-material/ViewList";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Filters from "./Filters";
import { useAuth } from "../../context/AuthContext";
import icons from "../Account/icons"

const SideNavigation = ({ drawerWidth = 300, categories = [], priceRange }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    return searchParams.get("categoryId");
  });

  const { currentUser, userIcon } = useAuth();

  const toggleCategoriesCollapse = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    searchParams.set("categoryId", categoryId);
    searchParams.delete("pageNumber");
    searchParams.delete("freeText");
    setSearchParams(searchParams);
  };

  const resetCategory = () => {
    searchParams.delete("categoryId");
    setSearchParams(searchParams);
    setSelectedCategoryId(null);
  };

  const getCategoryName = () => {
    if (categories) {
      const category = categories.filter((cat) => {
        return cat._id === selectedCategoryId;
      });
      return category[0].name;
    }
  };

  const pages = [
    {
      name: "Homepage",
      icon: <HomeIcon sx={{ color: "black" }}></HomeIcon>,
      link: "/",
    },
    {
      name: "Categories",
      icon: <CategoryIcon sx={{ color: "black" }}></CategoryIcon>,
      link: "/categories",
    },
    {
      name: "About",
      icon: <InfoIcon sx={{ color: "black" }}></InfoIcon>,
      link: "/about",
    },
  ];

  useEffect(() => {
    setSelectedCategoryId(searchParams.get("categoryId"));
  }, [searchParams]);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={false}
      PaperProps={{
        width: `${drawerWidth}`,
        style: { backgroundColor: "white" },
      }}
      sx={{
        width: drawerWidth,
        backgroundColor: "#24344c",
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      {!selectedCategoryId && (
        <Box sx={{ overflow: "auto", color: "black" }} paddingTop={3}>
          {currentUser && (
            <>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                paddingBottom={3}
              >
                <Avatar>
                  
                  { icons[userIcon] }
                </Avatar>
                <Typography variant="body1" fontWeight={"bold"}>
                  {currentUser.displayName}
                </Typography>
                <Typography variant="caption" color={"GrayText"}>
                  {currentUser.email}
                </Typography>
              </Box>
              <Divider></Divider>
            </>
          )}
          <List>
            {pages.map((page, index) => (
              <ListItem key={page.name} disablePadding>
                <ListItemButton
                  LinkComponent={Link}
                  to={page.link}
                  selected={window.location.pathname === page.link}
                >
                  <ListItemIcon color="info">{page.icon}</ListItemIcon>
                  <ListItemText primary={page.name}></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {(() => {
              if (categories) {
                const ListItems = categories.map((category, index) => {
                  return (
                    <ListItem key={category._id} disablePadding>
                      <ListItemButton
                        className="side-nav-list-item"
                        selected={category._id === selectedCategoryId}
                        onClick={() => handleCategoryClick(category._id)}
                      >
                        <ListItemIcon sx={{ color: "black" }}>
                          {category.icon}
                        </ListItemIcon>
                        <ListItemText primary={category.name} />
                      </ListItemButton>
                    </ListItem>
                  );
                });
                return (
                  <>
                    <ListItemButton onClick={toggleCategoriesCollapse}>
                      <ListItemIcon sx={{ color: "black" }}>
                        <AllCategoriesIcon></AllCategoriesIcon>
                      </ListItemIcon>
                      <ListItemText>All Categories</ListItemText>
                      {isCategoriesOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                      in={isCategoriesOpen}
                      timeout={"auto"}
                      unmountOnExit
                    >
                      <ListItem disablePadding>
                        <ListItemButton
                          className="side-nav-list-item"
                          selected={!selectedCategoryId}
                          onClick={() => resetCategory()}
                        >
                          <ListItemIcon></ListItemIcon>
                          <ListItemText primary={"All Products"} />
                        </ListItemButton>
                      </ListItem>
                      {ListItems}
                    </Collapse>
                  </>
                );
              } else {
                return <CircularProgress></CircularProgress>;
              }
            })()}
          </List>
        </Box>
      )}

      {selectedCategoryId && (
        <Filters
          categoryName={getCategoryName()}
          priceRange={priceRange}
        ></Filters>
      )}
    </Drawer>
  );
};

export default SideNavigation;
