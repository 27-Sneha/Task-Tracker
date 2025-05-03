import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Grid container className="navbar-container">
      <Grid size={{ xs: 8 }}>
        <Typography className="navbar-title">
          Welcome to Task Tracker
        </Typography>
      </Grid>
      <Grid size={{ xs: 4 }} className="navbar-logout-item">
        <Button
          variant="contained"
          className="navbar-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Navbar;
