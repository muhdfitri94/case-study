import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EmployeeCard from "../card/EmployeeCard";
import AddEmployee from "../card/AddEmployee";
import axios from "axios";

const Employee = () => {
  const [addNewEmployee, setAddNewEmployee] = useState(false);

  const [filterAddress, setFilterAddress] = useState('All');

  const [addressData, setAddressData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/address").then((res) => {
      setAddressData(res.data);
    });
  }, []);

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
        <Typography variant="h4"> Employees</Typography>
        <Button
          onClick={() => setAddNewEmployee(true)}
          startIcon={<PersonAddOutlinedIcon />}
          sx={{
            marginLeft: "16px",
            color: "#50D492",
          }}
        >
          Add New Employee
        </Button>
        <AddEmployee
          open={addNewEmployee}
          onClose={() => setAddNewEmployee(false)}
        />
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120, marginLeft: "auto" }}
        >
          <InputLabel id="select-standard-label">Filter Address</InputLabel>
          <Select
            labelId="select-standard-label"
            id="select-standard"
            name="addressName"
            onChange={(e) => setFilterAddress(e.target.value)}
            label="Address"
          >
            <MenuItem value={"All"}>{"All"}</MenuItem>
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
          padding: "23px 12px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <EmployeeCard filterAddress={filterAddress} />
      </Box>
    </>
  );
};

export default Employee;
