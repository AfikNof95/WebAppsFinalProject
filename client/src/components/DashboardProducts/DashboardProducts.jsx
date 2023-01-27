import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import firebaseAPI from "../../context/firebase";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import RestoreIcon from "@mui/icons-material/Undo";
import DashboardProductsDialog from "./DashboardProductsDialog";
import DashboardProductsRemoveDialog from "./DashboardProductRemoveDialog";
import DashboardProductRestoreDialog from "./DashboardProductRestoreDialog";

const DashboardProducts = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [snackBarState, setSnackBarState] = useState({
    show: false,
    message: "",
    severity: "error",
  });

  const handleEditClick = useCallback(
    (productId) => {
      setCurrentProduct(() => {
        return products.filter((product) => product._id === productId)[0];
      });
      setIsEditDialogOpen(true);
    },
    [products]
  );

  const handleAddProductClick = useCallback(() => {
    setCurrentProduct({
      name: "",
      description: "",
      category: {},
      price: 0,
      quantity: 0,
      isActive: true,
      images: [],
    });
    setIsEditDialogOpen(true);
  }, []);

  const handleDeleteClick = useCallback(
    (productId) => {
      setCurrentProduct(() => {
        return products.filter((product) => product._id === productId)[0];
      });
      setIsRemoveDialogOpen(true);
    },
    [products]
  );

  const handleRestoreClick = useCallback(
    (productId) => {
      setCurrentProduct(() => {
        return products.filter((product) => product._id === productId)[0];
      });
      setIsRestoreDialogOpen(true);
    },
    [products]
  );

  const cols = useMemo(
    () => [
      {
        field: "_id",
        headerName: "ID",
        flex: 1,
        editable: false,
        hideable: false,
      },
      {
        field: "name",
        headerName: "Display name",
        flex: 1,
        editable: true,
        hideable: false,
      },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        flex: 1,
        editable: true,
        hideable: false,
      },
      {
        field: "category",
        headerName: "Category",
        type: "string",
        flex: 1,
        editable: false,
        hideable: false,
        valueGetter: (params) => {
          if (params.row.category) {
            return params.row.category.name;
          }
          return params.value;
        },
      },
      {
        field: "price",
        headerName: "Price($)",
        type: "number",
        editable: true,
        hideable: false,
        flex: 1,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        type: "number",
        editable: true,
        hideable: false,
        flex: 1,
      },
      {
        field: "isActive",
        headerName: "Is active?",
        description:
          "This column indicates whether the user is disabled or not.",
        type: "boolean",
        editable: true,
        hideable: false,
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        getActions: ({ id, row }) => {
          const deleteAction = row.isActive ? (
            <GridActionsCellItem
              icon={
                <Tooltip title="Delete Product">
                  <DeleteIcon />
                </Tooltip>
              }
              label="Delete"
              onClick={() => {
                handleDeleteClick(id);
              }}
              color="inherit"
            />
          ) : (
            <GridActionsCellItem
              icon={
                <Tooltip title="Restore product">
                  <RestoreIcon />
                </Tooltip>
              }
              label="Delete"
              onClick={() => {
                handleRestoreClick(id);
              }}
              color="inherit"
            />
          );
          return [
            <GridActionsCellItem
              icon={
                <Tooltip title="Edit product">
                  <EditIcon />
                </Tooltip>
              }
              label="Edit"
              className="textPrimary"
              onClick={() => {
                handleEditClick(id);
              }}
              color="inherit"
            />,
            deleteAction,
          ];
        },
      },
    ],
    [handleEditClick, handleDeleteClick, handleRestoreClick]
  );

  const tableToolbar = () => {
    return (
      <GridToolbarContainer>
        <Button
          variant="contained"
          startIcon={<AddIcon></AddIcon>}
          onClick={() => {
            handleAddProductClick();
          }}
        >
          Add Product
        </Button>
      </GridToolbarContainer>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let responseProducts = await firebaseAPI.admin.product.getAll(token);
      let responseCategories = await firebaseAPI.admin.category.getAll(token);
      let { products: prods } = responseProducts.data;
      const { categories } = responseCategories.data;
      setProducts(prods);
      setCategories(categories);
      setIsLoading(false);
    };

    fetchProducts();
  }, [token]);

  const toggleProductIsActive = async (product, callback) => {
    try {
      product.isActive = !product.isActive;
      await firebaseAPI.admin.product.update(product);
      setProducts((currentProductsState) => {
        return currentProductsState.map((prod) => {
          if (prod._id === product._id) {
            return product;
          }
          return prod;
        });
      });
      showSuccessSnackbar();
      callback();
    } catch (ex) {
      showErrorSnackbar();
    }
  };

  const handleRemoveDialogClose = () => {
    setCurrentProduct({});
    setIsRemoveDialogOpen(false);
  };
  const handleRemoveDialogConfirm = (product) => {
    toggleProductIsActive(product, () => {
      setIsRemoveDialogOpen(false);
    });
  };

  const handleRestoreDialogClose = () => {
    setCurrentProduct({});
    setIsRestoreDialogOpen(false);
  };

  const handleRestoreDialogConfirm = (product) => {
    toggleProductIsActive(product, () => {
      setIsRestoreDialogOpen(false);
    });
  };

  const updateProductDetails = async (params, event, details) => {
    if (params.field === "id") {
      return;
    }

    const updatedProduct = products.filter(
      (product) => product._id === params.id
    )[0];

    if (updatedProduct[params.field] !== params.value) {
      updatedProduct[params.field] = params.value;
      try {
        showSuccessSnackbar();
      } catch (ex) {
        showErrorSnackbar();
      }
      await firebaseAPI.admin.product.update(updatedProduct, token);
    }
  };

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
    setCurrentProduct({});
  };

  const handleDialogSave = async (updatedProduct) => {
    try {
      if (!updatedProduct._id) {
        await firebaseAPI.admin.product.create(updatedProduct);
      } else {
        await firebaseAPI.admin.product.update(updatedProduct);
      }

      setProducts((currentProductState) => {
        return currentProductState.map((product) => {
          if (product._id === updatedProduct._id) {
            return { ...product, ...updatedProduct };
          }
          return product;
        });
      });
      setIsEditDialogOpen(false);
      showSuccessSnackbar();
    } catch (ex) {
      console.error(ex);
      showErrorSnackbar();
    }
  };

  const showErrorSnackbar = () => {
    updateSnackBarState({
      show: true,
      message: "Couldn't update product details!",
      severity: "error",
    });
  };

  const showSuccessSnackbar = () => {
    updateSnackBarState({
      show: true,
      message: "Product updated successfully!",
      severity: "success",
    });
  };

  const updateSnackBarState = (state) => {
    setSnackBarState((currentState) => {
      return { ...currentState, ...state };
    });
  };

  return (
    <>
      {isLoading ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ width: "100%", height: "100vh" }}
        >
          <CircularProgress style={{ width: "50vh", height: "50vh" }} />
        </Box>
      ) : (
        <>
          <DataGrid
            getRowId={(row) => row._id}
            rows={products}
            columns={cols}
            pageSize={20}
            components={{ Toolbar: tableToolbar }}
            rowsPerPageOptions={[20]}
            sx={{ height: "100vh" }}
            onCellEditCommit={updateProductDetails}
          ></DataGrid>

          {isEditDialogOpen && (
            <DashboardProductsDialog
              handleDialogClose={handleDialogClose}
              handleDialogSave={handleDialogSave}
              open={isEditDialogOpen}
              product={currentProduct}
              categories={categories}
            ></DashboardProductsDialog>
          )}
          {isRemoveDialogOpen && (
            <DashboardProductsRemoveDialog
              handleDialogClose={handleRemoveDialogClose}
              handleDialogConfirm={handleRemoveDialogConfirm}
              open={isRemoveDialogOpen}
              product={currentProduct}
            ></DashboardProductsRemoveDialog>
          )}
          {isRestoreDialogOpen && (
            <DashboardProductRestoreDialog
              handleDialogClose={handleRestoreDialogClose}
              handleDialogConfirm={handleRestoreDialogConfirm}
              open={isRestoreDialogOpen}
              product={currentProduct}
            ></DashboardProductRestoreDialog>
          )}
          <Snackbar
            open={snackBarState.show}
            onClose={() => updateSnackBarState({ show: false })}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              severity={snackBarState.severity}
              variant="filled"
              sx={{ width: "100%", marginTop: 3 }}
            >
              {snackBarState.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default DashboardProducts;
