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
import { height } from "@mui/system";

const SideNavigation = ({ drawerWidth = 300, categories = [], priceRange }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    return searchParams.get("categoryId");
  });

  const { currentUser } = useAuth();

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
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            paddingBottom={3}
          >
            <Avatar
              sx={{
                height: 80,
                width: 80,
              }}
              src="data:image/png;base64,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"
            ></Avatar>
            <Typography variant="body1" fontWeight={"bold"}>
              {currentUser.displayName}
            </Typography>
            <Typography variant="caption" color={"GrayText"}>
              {currentUser.email}
            </Typography>
          </Box>
          <Divider></Divider>
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
