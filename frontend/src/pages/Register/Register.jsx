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
  MenuItem,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Email,
  Lock,
  Person,
  Language,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { countries } from "../../constants/countryData";
import { register } from "../../services/authService";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const Register = () => {
  //   const { user, login, facebookLogin } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
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
    if (!name || !email || !password || !country) {
      setSnackbar({
        open: true,
        message: "Please fill all the fields!!",
        severity: "error",
      });
      return;
    }
    try {
      const payload = {
        name: name,
        email: email,
        password: password,
        country: country,
      };
      await register(payload);
      setSnackbar({
        open: true,
        message: "User registered successfully!",
        severity: "success",
      });
      navigate("/login");
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
              REGISTER
            </Typography>
          </Grid>
          <Grid className="login-form-section">
            <FormControl>
              <TextField
                id="name"
                label="Username"
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  sx: { height: "45px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
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
            <FormControl>
              <TextField
                id="country"
                label="Country"
                select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                InputProps={{
                  sx: { height: "45px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Language />
                    </InputAdornment>
                  ),
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        boxShadow: "none",
                        maxHeight: 2.5 * 48,
                      },
                    },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                  },
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>
              SIGN UP
            </Button>
          </Grid>
          <Grid>
            <Typography>
              Already have an account? <Link to="/login">Sign in</Link>
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

export default Register;
