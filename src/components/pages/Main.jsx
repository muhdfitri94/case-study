import { Box } from "@mui/material";
import NavBar from "../../components/NavBar";
import Employee from "./Employee";
import Address from "./Address";

const Main = () => {
  return (
    <Box sx={{ margin: "30px 50px" }}>
      <NavBar />
      <Employee />
      <Address />
    </Box>
  );
};

export default Main;
