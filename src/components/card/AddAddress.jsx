import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, TextField, Typography, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  borderRadius: "20px",
  bgcolor: "background.paper",
  outline: "none",
  //   boxShadow: 24,
  //   p: 4,
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

const AddAddress = (props) => {
  const [addressName, setAddressName] = useState("");
  const [unit, setUnit] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (event) => {

    axios.post("http://localhost:3001/address", {
      addressName,
      unit,
      street,
      postcode,
      country,
    });
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Item sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              padding: "25px",
            }}
          >
            <Typography variant="h6">Add New Address</Typography>

            <TextField
              onChange={(e) => setAddressName(e.target.value)}
              fullWidth
              id="outlined-basic"
              label="Address Name"
              variant="outlined"
              margin="normal"
            />
            <TextField
              onChange={(e) => setUnit(e.target.value)}
              fullWidth
              id="outlined-basic"
              label="Unit/Block/Building"
              variant="outlined"
              margin="normal"
            />
            <TextField
              onChange={(e) => setStreet(e.target.value)}
              fullWidth
              id="outlined-basic"
              label="Street"
              variant="outlined"
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  onChange={(e) => setPostcode(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="Postcode"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  onChange={(e) => setCountry(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="Country"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </Grid>
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
              SAVE
            </SuccessButton>
          </Box>
        </Item>
      </form>
    </Modal>
  );
};

export default AddAddress;
