import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

function Dashboard() {
  // +35 state.authtan userı çıakr varsa logout yap. dashboarda  çağırma.
  const { user } = useSelector((state) => state.auth);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* margin padding gibi eklemeler yapıyor. */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            STOCK APP
          </Typography>
          {user && <Button color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Dashboard;
