import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import firebaseAPI from "../../context/firebase";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const DashboardProducts = ({ token }) => {
  const [cols, setColumns] = useState([
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
      type: "text",
      flex: 1,
      editable: true,
      hideable: false,
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
      headerName: "Stock",
      type: "number",
      editable: true,
      hideable: false,
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Is active?",
      description: "This column indicates whether the user is disabled or not.",
      type: "boolean",
      editable: true,
      hideable: false,
      flex: 1,
    },
  ]);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      let response = await firebaseAPI.admin.product.getAll(token);
      let { products } = response.data;
      setRows(products);
      setIsLoading(false);
    };

    fetchProducts();
  }, [token]);

  const updateProductDetails = (params, event, details) => {
    if (params.field === "id") {
      return;
    }

    const updatedProduct = rows.filter(
      (product) => product._id === params.id
    )[0];

    if (updatedProduct[params.field] !== params.value) {
      updatedProduct[params.field] = params.value;
      firebaseAPI.admin.product.update(updatedProduct, token);
    }
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
        <DataGrid
          getRowId={(row) => row._id}
          rows={rows}
          columns={cols}
          pageSize={20}
          rowsPerPageOptions={[20, 50, 100]}
          sx={{ height: "100vh" }}
          onCellEditCommit={updateProductDetails}
        ></DataGrid>
      )}
    </>
  );
};

export default DashboardProducts;
