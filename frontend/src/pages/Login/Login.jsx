import {
  Grid,
  Typography,
  FormControl,
  Divider,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";
import { login } from "../../services/authService";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const Login = () => {
  //   const { user, login, facebookLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setSnackbar({
        open: true,
        message: "Please fill all the fields!!",
        severity: "error",
      });
      return;
    }
    try {
      const payload = { email: email, password: password };
      await login(payload);
      setSnackbar({
        open: true,
        message: "User logged in successfully!",
        severity: "success",
      });
      navigate("/home");
    } catch (err) {
      console.log(err.response.data.message);
      setSnackbar({
        open: true,
        message: err.response.data.message,
        severity: "error",
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Grid container className="login-container">
      <Grid size={{ sm: 6, md: 5, lg: 4 }}>
        <Grid container className="login-form-container">
          <Grid>
            <Typography
              fontSize={{ xs: "30px", sm: "34px" }}
              fontWeight="bold"
              color="#0070b9"
            >
              LOGIN
            </Typography>
          </Grid>
          <Grid className="login-form-section">
            <FormControl>
              <TextField
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  sx: { height: "45px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  sx: { height: "45px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className="custom-text-field"
              />
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>
              SIGN IN
            </Button>
          </Grid>
          <Grid>
            <Typography>
              Don't have an account? <Link to="/register">Sign up</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </Grid>
  );
};

export default Login;
