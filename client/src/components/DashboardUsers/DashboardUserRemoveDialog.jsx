import { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/system";
import { AppBar, IconButton, Toolbar, Typography, Slide } from "@mui/material";
import Close from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DashboardUserRemoveDialog = ({
  user,
  open,
  handleDialogClose,
  handleDialogConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      TransitionComponent={Transition}
      maxWidth={"md"}
      
    >
      <AppBar sx={{ position: "relative" }} color="error">
        <Toolbar>
          <Typography variant="body1" paddingRight={5}>
            Disable User
          </Typography>
          <IconButton
            edge="end"
            sx={{ color: "white", right: 15, position: "absolute" }}
            onClick={handleDialogClose}
          >
            <Close></Close>
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={"space-between"}
        >
          <Box>
            <Typography variant="body1">
              Are you sure you want to disable:
            </Typography>
            <Typography variant="body2" fontWeight={"bold"}>
              {user.displayName || user.email}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDialogClose}
          variant="outlined"
          color="warning"
          sx={{ marginRight: 5, width: 150 }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleDialogConfirm(user)}
          variant="contained"
          color="error"
          sx={{ width: 150 }}
        >
          Disable
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardUserRemoveDialog;
