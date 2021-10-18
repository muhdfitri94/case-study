import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, TextField, Typography } from "@mui/material";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  borderRadius: "20px",
  bgcolor: "background.paper",
  outline: "none",
};

const SuccessButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  color: "#fff",
  backgroundColor: "#50D492",
  "&:hover": {
    backgroundColor: "#50D492",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

const Login = () => {
  return (
    <Box sx={{ margin: "30px 50px" }}>
      <Item sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "25px",
          }}
        >
          <Typography variant="h6">Login</Typography>

          <TextField
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            margin="normal"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            padding: "12px 20px",
          }}
        >
          <SuccessButton
            fullWidth
            variant="contained"
            type="submit"
            value="Submit"
          >
            SIGN IN
            <Box
              sx={{
                width: "24px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowSmRightIcon />
            </Box>
          </SuccessButton>
        </Box>
      </Item>
    </Box>
  );
};

export default Login;
