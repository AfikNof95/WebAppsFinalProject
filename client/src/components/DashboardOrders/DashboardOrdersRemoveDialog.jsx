import { forwardRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material/';
import { AppBar, IconButton, Toolbar, Typography, Slide } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { Box } from '@mui/system';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DashboardOrdersRemoveDialog = ({ order, open, handleDialogClose, handleDialogConfirm }) => {
  const [orderDetails, setOrderDetails] = useState(order);

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      TransitionComponent={Transition}
      maxWidth={'md'}>
      <AppBar sx={{ position: 'relative' }} color="error">
        <Toolbar>
          <Typography variant="body1" paddingRight={5}>
            Delete Order
          </Typography>
          <IconButton
            edge="end"
            sx={{ color: 'white', right: 15, position: 'absolute' }}
            onClick={handleDialogClose}>
            <Close></Close>
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Box display="flex" flexDirection="row" justifyContent={'space-between'}>
          <Box>
            <Typography variant="body1">Are you sure you want to delete:</Typography>
            <Typography variant="body2" fontWeight={'bold'}>
              {orderDetails._id}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDialogClose}
          variant="outlined"
          color="secondaryButton"
          sx={{ marginRight: 5, width: 150 }}>
          Cancel
        </Button>
        <Button
          onClick={() => handleDialogConfirm(orderDetails)}
          variant="contained"
          color="error"
          sx={{ width: 150 }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardOrdersRemoveDialog;
