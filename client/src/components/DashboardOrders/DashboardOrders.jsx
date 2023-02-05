import { DataGrid, GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import backendAPI from '../../api';
import { Alert, Button, CircularProgress, IconButton, Snackbar, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RestoreIcon from '@mui/icons-material/Undo';
import DashboardOrdersEditDialog from './DashboardOrdersEditDialog';
import DashboardOrdersRemoveDialog from './DashboardOrdersRemoveDialog';
import DashboardOrdersRestoreDialog from './DashboardOrdersRestoreDialog';

const DashboardOrders = ({ token, ordersArray, users }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const [snackBarState, setSnackBarState] = useState({
    show: false,
    message: '',
    severity: 'error'
  });

  useEffect(() => {
    setOrders(ordersArray);
    setIsLoading(false);
  }, [ordersArray]);

  const handleEditClick = useCallback(
    (orderId) => {
      setCurrentOrder(() => {
        return orders.filter((order) => order._id === orderId)[0];
      });
      setIsEditDialogOpen(true);
    },
    [orders]
  );

  const handleDeleteClick = useCallback(
    (orderId) => {
      setCurrentOrder(() => {
        return orders.filter((order) => order._id === orderId)[0];
      });
      setIsRemoveDialogOpen(true);
    },
    [orders]
  );

  const handleRestoreClick = useCallback(
    (orderId) => {
      setCurrentOrder(() => {
        return orders.filter((order) => order._id === orderId)[0];
      });
      setIsRestoreDialogOpen(true);
    },
    [orders]
  );

  const cols = useMemo(
    () => [
      {
        field: '_id',
        headerName: 'ID',
        flex: 1,
        editable: false,
        hideable: false
      },
      {
        field: 'user',
        headerName: 'User',
        flex: 1,
        editable: false,
        hideable: false,
        valueGetter: (params) => {
          if (params.row.user) {
            const user = users.filter((user) => user.uid === params.row.user);
            if (user[0]) {
              return user[0].email;
            }
          }
          return params.value;
        }
      },
      {
        field: 'address',
        headerName: 'Address',
        type: 'string',
        flex: 1,
        editable: false,
        hideable: false,
        valueGetter: (params) => {
          if (params.row.address) {
            return `${params.row.address.city}, ${params.row.address.street} ${params.row.address.houseNumber}`;
          }
          return params.value;
        }
      },
      {
        field: 'totalPrice',
        headerName: 'Total Price($)',
        type: 'number',
        flex: 1,
        editable: true,
        hideable: false
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        type: 'singleSelect',
        valueOptions: ['Created', 'Packed', 'Delivered'],
        editable: true,
        hideable: false
      },

      {
        field: 'isActive',
        headerName: 'Is active?',
        description: 'This column indicates whether the user is disabled or not.',
        type: 'boolean',
        editable: true,
        hideable: false,
        flex: 1
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        getActions: ({ id, row }) => {
          const deleteAction = row.isActive ? (
            <GridActionsCellItem
              icon={
                <Tooltip title="Delete Product">
                  <DeleteIcon color="error" />
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
                  <RestoreIcon color="info" />
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
            deleteAction
          ];
        }
      }
    ],
    [handleEditClick, handleDeleteClick, handleRestoreClick, users]
  );

  const toggleOrderIsActive = async (order, callback) => {
    try {
      order.isActive = !order.isActive;
      await backendAPI.admin.product.update(order);
      setOrders((currentOrdersState) => {
        return currentOrdersState.map((ord) => {
          if (ord._id === order._id) {
            return order;
          }
          return ord;
        });
      });
      showSuccessSnackbar();
      callback();
    } catch (ex) {
      showErrorSnackbar();
    }
  };

  const handleRemoveDialogClose = () => {
    setCurrentOrder({});
    setIsRemoveDialogOpen(false);
  };
  const handleRemoveDialogConfirm = (product) => {
    toggleOrderIsActive(product, () => {
      setIsRemoveDialogOpen(false);
    });
  };

  const handleRestoreDialogClose = () => {
    setCurrentOrder({});
    setIsRestoreDialogOpen(false);
  };

  const handleRestoreDialogConfirm = (product) => {
    toggleOrderIsActive(product, () => {
      setIsRestoreDialogOpen(false);
    });
  };

  const updateOrderDetails = async (params, event, details) => {
    try {
      if (params.field === 'id') {
        return;
      }
      const updatedOrder = orders.filter((order) => order._id === params.id)[0];
      if (updatedOrder[params.field] == params.value) {
        return;
      }
      updatedOrder[params.field] = params.value;
      await backendAPI.admin.order.update(updatedOrder);
      showSuccessSnackbar();
    } catch (ex) {
      showErrorSnackbar();
    }
  };

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
    setCurrentOrder({});
  };

  const handleDialogSave = async (updatedOrder) => {
    try {
      await backendAPI.admin.order.update(updatedOrder);

      setOrders((currentOrdersState) => {
        return currentOrdersState.map((order) => {
          if (order._id === updatedOrder._id) {
            return { ...order, ...updatedOrder };
          }
          return order;
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
      message: "Couldn't update order details!",
      severity: 'error'
    });
  };

  const showSuccessSnackbar = () => {
    updateSnackBarState({
      show: true,
      message: 'Order updated successfully!',
      severity: 'success'
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
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ width: '100%', height: '100vh' }}>
          <CircularProgress style={{ width: '50vh', height: '50vh' }} />
        </Box>
      ) : (
        <>
          <DataGrid
            getRowId={(row) => row._id}
            rows={orders}
            columns={cols}
            pageSize={20}
            rowsPerPageOptions={[20]}
            sx={{ height: '100vh' }}
            onCellEditCommit={updateOrderDetails}></DataGrid>

          {isEditDialogOpen && (
            <DashboardOrdersEditDialog
              handleDialogClose={handleDialogClose}
              handleDialogSave={handleDialogSave}
              open={isEditDialogOpen}
              order={currentOrder}></DashboardOrdersEditDialog>
          )}
          {isRemoveDialogOpen && (
            <DashboardOrdersRemoveDialog
              handleDialogClose={handleRemoveDialogClose}
              handleDialogConfirm={handleRemoveDialogConfirm}
              open={isRemoveDialogOpen}
              product={currentOrder}></DashboardOrdersRemoveDialog>
          )}
          {isRestoreDialogOpen && (
            <DashboardOrdersRestoreDialog
              handleDialogClose={handleRestoreDialogClose}
              handleDialogConfirm={handleRestoreDialogConfirm}
              open={isRestoreDialogOpen}
              product={currentOrder}></DashboardOrdersRestoreDialog>
          )}
          <Snackbar
            open={snackBarState.show}
            onClose={() => updateSnackBarState({ show: false })}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert
              severity={snackBarState.severity}
              variant="filled"
              sx={{ width: '100%', marginTop: 3 }}>
              {snackBarState.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default DashboardOrders;
