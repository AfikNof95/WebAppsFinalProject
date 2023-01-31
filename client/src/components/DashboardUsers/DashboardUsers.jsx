import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import backendAPI from "../../api";
import { CircularProgress, Tooltip, Alert, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import RestoreIcon from "@mui/icons-material/Undo";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DashboardUserRestoreDialog from "./DashboardUserRestoreDialog";
import DashboardUserRemoveDialog from "./DashboardUserRemoveDialog";
const DashboardUsers = ({ token, usersArray,updateUserAnalytics }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snackBarState, setSnackBarState] = useState({
    show: false,
    message: "",
    severity: "error",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [isShowRestoreDialog, setIsShowRestoreDialog] = useState(false);
  const [isShowRemoveDialog, setIsShowRemoveDialog] = useState(false);

  const handleDeleteClick = useCallback(
    (uid) => {
      const user = users.filter((row) => {
        return row.uid === uid;
      });
      setCurrentUser(user[0]);
      setIsShowRemoveDialog(true);
    },
    [users]
  );

  const handleRestoreClick = useCallback(
    (uid) => {
      const user = users.filter((row) => {
        return row.uid === uid;
      });
      setCurrentUser(user[0]);
      setIsShowRestoreDialog(true);
    },
    [users]
  );
  const cols = useMemo(
    () => [
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
        type: "string",
        flex: 1,
        editable: true,
        hideable: false,
      },
      {
        field: "disabled",
        headerName: "Disabled?",
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
          const deleteAction = row.disabled ? (
            <GridActionsCellItem
              icon={
                <Tooltip title={"Enable"}>
                  <RestoreIcon color="info" />
                </Tooltip>
              }
              label="Enable"
              onClick={() => handleRestoreClick(id)}
              color="inherit"
            />
          ) : (
            <GridActionsCellItem
              icon={
                <Tooltip title={"Disable"}>
                  <DeleteIcon color="error" />
                </Tooltip>
              }
              label="Disable"
              onClick={() => handleDeleteClick(id)}
              color="inherit"
            />
          );
          return [deleteAction];
        },
      },
    ],
    [handleDeleteClick, handleRestoreClick]
  );

  useEffect(() => {
    if (usersArray.length) {
      setUsers(usersArray);
      setIsLoading(false);
    }
  }, [usersArray]);

  const showErrorSnackbar = () => {
    updateSnackBarState({
      show: true,
      message: "Couldn't update user details!",
      severity: "error",
    });
  };

  const showSuccessSnackbar = () => {
    updateSnackBarState({
      show: true,
      message: "User updated successfully!",
      severity: "success",
    });
  };

  const updateSnackBarState = (state) => {
    setSnackBarState((currentState) => {
      return { ...currentState, ...state };
    });
  };

  const updateUserDetails = async (params, event, details) => {
    try {
      if (params.field === "id") {
        return;
      }

      const updatedUser = users.filter((user) => user.uid === params.id)[0];
      if (updatedUser[params.field] === params.value) {
        return;
      }
      updatedUser[params.field] = params.value;
      await backendAPI.admin.user.update(updatedUser, token);
      showSuccessSnackbar();
    } catch (ex) {
      showErrorSnackbar();
    }
  };

  const handleDialogClose = () => {
    setCurrentUser({});
    setIsShowRestoreDialog(false);
    setIsShowRemoveDialog(false);
  };

  const handleDialogConfirm = (user) => {
    try {
      updateUserDetails({
        field: "disabled",
        value: !user.disabled,
        id: user.uid,
      });
      setIsShowRestoreDialog(false);
      setIsShowRemoveDialog(false);
      showSuccessSnackbar();
      updateUserAnalytics();
    } catch (ex) {
      showErrorSnackbar();
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
          getRowId={(row) => row.uid}
          rows={users}
          columns={cols}
          pageSize={20}
          rowsPerPageOptions={[20]}
          sx={{ height: "100vh" }}
          onCellEditCommit={updateUserDetails}
        ></DataGrid>
      )}
      {isShowRestoreDialog && (
        <DashboardUserRestoreDialog
          handleDialogClose={handleDialogClose}
          handleDialogConfirm={handleDialogConfirm}
          open={isShowRestoreDialog}
          user={currentUser}
        ></DashboardUserRestoreDialog>
      )}
      {isShowRemoveDialog && (
        <DashboardUserRemoveDialog
          handleDialogClose={handleDialogClose}
          handleDialogConfirm={handleDialogConfirm}
          open={isShowRemoveDialog}
          user={currentUser}
        ></DashboardUserRemoveDialog>
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
  );
};

export default DashboardUsers;
