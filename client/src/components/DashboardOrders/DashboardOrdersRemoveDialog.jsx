import { forwardRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { AppBar, IconButton, Toolbar, Typography, Slide } from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DashboardOrdersRemoveDialog = ({
  product,
  open,
  handleDialogClose,
  handleDialogConfirm,
}) => {
  const [productDetails, setProductDetails] = useState(product);

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
            Delete Product
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
          <Box maxWidth={150} marginRight={5}>
            <img
              src={product.images[0]}
              width="100%"
              style={{ objectFit: "contain" }}
              alt=""
            ></img>
          </Box>

          <Box>
            <Typography variant="body1">
              Are you sure you want to delete:
            </Typography>
            <Typography variant="body2" fontWeight={"bold"}>
              {productDetails.name}
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
          onClick={() => handleDialogConfirm(productDetails)}
          variant="contained"
          color="error"
          sx={{ width: 150 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardOrdersRemoveDialog;
