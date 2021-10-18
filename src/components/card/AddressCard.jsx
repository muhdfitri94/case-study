import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Button,
  TextField,
  Typography,
  Grid
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

const AddressCard = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [id, setID] = useState(null);
  const [selected, setSelected] = useState("");
  const [addressName, setAddressName] = useState("");
  const [unit, setUnit] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [workAddress, setWorkAddress] = useState("");

  const [addressData, setAddressData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/address").then((res) => {
      setAddressData(res.data);
    });
  }, []);

  const getData = () => {
    axios.get(`http://localhost:3001/address`).then((getData) => {
      setAddressData(getData.data);
    });
  };

  useEffect(() => {
    setID(selected.id);
    setAddressName(selected.addressName);
    setUnit(selected.unit);
    setStreet(selected.unit);
    setPostcode(selected.postcode);
    setCountry(selected.country);
    setWorkAddress(selected.workAddress);
  }, [selected]);

  const updateAddressData = () => {
    axios
      .put(`http://localhost:3001/address/${selected.id}`, {
        addressName,
        unit,
        street,
        postcode,
        country,
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
    axios.delete(`http://localhost:3001/address/${id}`).then(() => {
      getData();
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        {addressData &&
          addressData.map((data) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "grid", gridAutoFlow: "row" }}
              >
                <Item sx={{ borderRadius: "20px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "16px 20px 0px 20px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#389466",
                      }}
                    >
                      {data.addressName}
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
                          setSelected(data);
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
                          onDelete(data.id);
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      padding: "16px 20px 16px 20px",
                    }}
                  >
                    <Typography variant="subtitle1">{data.unit}</Typography>
                    <Typography variant="subtitle1">{data.street}</Typography>

                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ mr: 1 }}>
                        {data.postcode}
                      </Typography>
                      <Typography variant="subtitle1">
                        {data.country}
                      </Typography>
                    </Box>
                  </Box>
                </Item>
              </Grid>
            );
          })}
      </Grid>

      {/* Edit Address */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={updateAddressData}>
          <Item sx={modalStyle}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                padding: "25px",
              }}
            >
              <Typography variant="h6">Edit Address</Typography>

              <TextField
                onChange={(e) => setAddressName(e.target.value)}
                fullWidth
                id="outlined-basic"
                label="Address Name"
                variant="outlined"
                margin="normal"
                defaultValue={selected.addressName}
              />
              <TextField
                onChange={(e) => setUnit(e.target.value)}
                fullWidth
                id="outlined-basic"
                label="Unit/Block/Building"
                variant="outlined"
                margin="normal"
                defaultValue={selected.unit}
              />
              <TextField
                onChange={(e) => setStreet(e.target.value)}
                fullWidth
                id="outlined-basic"
                label="Street"
                variant="outlined"
                margin="normal"
                defaultValue={selected.street}
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
                    defaultValue={selected.postcode}
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
                    defaultValue={selected.country}
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
    </>
  );
};

export default AddressCard;
