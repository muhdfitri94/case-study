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
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
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

const EmployeeCard = (props) => {

  const [id, setID] = useState(null);
  const [selected, setSelected] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [employeeID, setEmployeeID] = useState(null);
  const [workAddress, setWorkAddress] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    if (props.filterAddress === "All") {
      axios.get(`http://localhost:3001/employees`).then((res) => {
        setEmployeeData(res.data);
      });
    } else {
      axios
        .get(
          `http://localhost:3001/employees?workAddress=${props.filterAddress}`
        )
        .then((res) => {
          setEmployeeData(res.data);
        });
    }
  }, [props.filterAddress]);

  const getData = () => {
    axios.get(`http://localhost:3001/employees`).then((getData) => {
      setEmployeeData(getData.data);
    });
  };

  useEffect(() => {
    setID(selected.id);
    setEmployeeName(selected.employeeName);
    setCurrentPosition(selected.currentPosition);
    setEmployeeID(selected.employeeID);
    setWorkAddress(selected.workAddress);
  }, [selected]);

  const updateEmployeeData = () => {
    axios
      .put(`http://localhost:3001/employees/${id}`, {
        employeeName,
        currentPosition,
        employeeID,
        workAddress,
      })
      .then((res) => {
        console.log("res");
        setSelected(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:3001/employees/${id}`).then(() => {
      getData();
    });
  };

  const [addressData, setAddressData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/address").then((res) => {
      setAddressData(res.data);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {employeeData &&
          employeeData.map((item) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "grid", gridAutoFlow: "row" }}
              >
                <Item key={item.id} sx={{ borderRadius: "20px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "16px 20px 0px 20px",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        textTransform: "uppercase",
                      }}
                    >
                      {item.employeeID}
                    </Typography>
                    <Box
                      sx={{
                        width: "24px",
                        marginLeft: "auto",
                      }}
                    >
                      <PencilAltIcon
                        onClick={() => {
                          handleOpen();
                          // setData(item);
                          setSelected(item);
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "24px",
                      }}
                    >
                      <TrashIcon
                        onClick={() => {
                          onDelete(item.id);
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      padding: "0px 20px 16px 20px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#389466",
                      }}
                    >
                      {item.employeeName}
                    </Typography>
                    <Typography variant="subtitle2">
                      {item.currentPosition}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      background: "#F5F5F5",
                      padding: "12px 20px",
                      borderRadius: "0px 0px 20px 20px",
                    }}
                  >
                    <Typography variant="subtitle1">
                      {item.workAddress}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
            );
          })}
      </Grid>

      {/* Edit Employee */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={updateEmployeeData}>
          <Item sx={modalStyle}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                padding: "25px",
              }}
            >
              <Typography variant="h6">Edit Employee</Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Employee Name"
                variant="outlined"
                margin="normal"
                name="employeeName"
                defaultValue={selected.employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Current Position"
                    variant="outlined"
                    margin="normal"
                    name="currentPosition"
                    defaultValue={selected.currentPosition}
                    onChange={(e) => setCurrentPosition(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Employee ID"
                    variant="outlined"
                    margin="normal"
                    name="employeeID"
                    defaultValue={selected.employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                  />
                </Grid>
              </Grid>
              <FormControl fullWidth margin="normal">
                <InputLabel id="select-standard-label">Work Address</InputLabel>
                <Select
                  labelId="select-standard-label"
                  id="select-standard"
                  label="Work Address"
                  name="workAddress"
                  defaultValue={selected.workAddress}
                  onChange={(e) => setWorkAddress(e.target.value)}
                >
                  {addressData &&
                    addressData.map((data) => {
                      return (
                        <MenuItem value={data.addressName}>
                          {data.addressName}
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
    </>
  );
};

export default EmployeeCard;
