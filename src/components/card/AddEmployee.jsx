import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Button,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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

const AddEmployee = (props) => {
  const [employeeName, setEmployeeName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [workAddress, setWorkAddress] = useState("");

  const handleChange = (event) => {
    setWorkAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();

    axios.post("http://localhost:3001/employees", {
      employeeName,
      currentPosition,
      employeeID,
      workAddress,
    });
  };

  const [addressData, setAddressData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/address").then((res) => {
      setAddressData(res.data);
    });
  }, []);

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
            <Typography variant="h6">Add New Employee</Typography>

            <TextField
              onChange={(e) => setEmployeeName(e.target.value)}
              fullWidth
              id="outlined-basic"
              label="Employee Name"
              variant="outlined"
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  onChange={(e) => setCurrentPosition(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="Current Position"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  onChange={(e) => setEmployeeID(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="Employee ID"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <InputLabel id="select-standard-label">Work Address</InputLabel>

              <Select
                labelId="select-standard-label"
                id="select-standard"
                value={workAddress}
                onChange={handleChange}
                label="Work Address"
              >
                {addressData &&
                  addressData.map((item) => {
                    return (
                      <MenuItem value={item.addressName}>
                        {item.addressName}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
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

export default AddEmployee;
