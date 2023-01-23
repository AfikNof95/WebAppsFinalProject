import "./SignIn.css";
import { Box, Link, TextField, Typography } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const { signIn } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signIn(data.get("email"), data.get("password"));
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component={"main"} maxWidth="xs">
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        marginTop={5}
        marginBottom={5}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <LockOutlinedIcon></LockOutlinedIcon>
        </Avatar>
        <Typography variant="h6">Sign In</Typography>
      </Box>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <TextField
          id="email"
          name="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          required
          type={"text"}
          fullWidth
        ></TextField>
        <TextField
          id="password"
          name="password"
          label="Password"
          type={"password"}
          required
          autoComplete="current-password"
          fullWidth
          margin="normal"
        ></TextField>
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Typography
            component={ReactLink}
            variant="body2"
            color="gray"
            to="/signUp"
          >
            Create an account
          </Typography>
          <Typography
            component={ReactLink}
            variant="body2"
            color={"gray"}
            sx={{ cursor: "pointer" }}
            to="#"
            onClick={handleForgotPassword}
          >
            Forgot my password
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Button variant="contained" type="submit" fullWidth>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
