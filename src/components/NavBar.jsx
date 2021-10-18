import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import { PeopleOutlineOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "#50D492",
          borderRadius: "20px",
        }}
      >
        <Toolbar>
          <IconButton
            component={Link}
            to={"/"}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <PeopleOutlineOutlined />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Management App
          </Typography>
          <Button color="inherit" component={Link} to={"/login"}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
