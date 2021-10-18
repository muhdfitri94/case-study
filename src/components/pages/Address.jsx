import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AddressCard from "../card/AddressCard";
import AddAddress from "../card/AddAddress";

const Address = () => {
  const [addNewAddress, setAddNewAddress] = useState(false);

  return (
    <>
      <Box
        sx={{
          padding: "50px 12px 0px 12px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="h4"> Addresses</Typography>
        <Button
          onClick={() => setAddNewAddress(true)}
          startIcon={<PersonAddOutlinedIcon />}
          sx={{
            marginLeft: "16px",
            color: "#50D492",
          }}
        >
          Add New Address
        </Button>
        <AddAddress
          open={addNewAddress}
          onClose={() => setAddNewAddress(false)}
        />
      </Box>
      <Box
        sx={{
          padding: "23px 12px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AddressCard />
      </Box>
    </>
  );
};

export default Address;
