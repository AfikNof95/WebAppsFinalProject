import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import firebaseAPI from "../../context/firebase";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const DashboardUsers = ({ token }) => {
  const [cols, setColumns] = useState([
    {
      field: "uid",
      headerName: "ID",
      flex: 1,
      editable: false,
      hideable: false,
    },
    {
      field: "displayName",
      headerName: "Display name",
      flex: 1,
      editable: true,
      hideable: false,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      flex: 1,
      editable: true,
      hideable: false,
    },
    {
      field: "disabled",
      headerName: "Disabled?",
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
    const fetchUsers = async () => {
      let response = await firebaseAPI.admin.user.getAll(token);
      let { users } = response.data;
      setRows(users);
      setIsLoading(false);
    };

    fetchUsers();
  }, [token]);

  const updateUserDetails = (params, event, details) => {
    if (params.field === "id") {
      return;
    }

    const updatedUser = rows.filter((user) => user.uid === params.id)[0];
    updatedUser[params.field] = params.value;

    firebaseAPI.admin.user.update(updatedUser, token);
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
          getRowId={(row) => row.uid}
          rows={rows}
          columns={cols}
          pageSize={20}
          rowsPerPageOptions={[20]}
          sx={{ height: "100vh" }}
          onCellEditCommit={updateUserDetails}
        ></DataGrid>
      )}
    </>
  );
};

export default DashboardUsers;
