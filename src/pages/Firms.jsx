import { Button, Typography, Box } from "@mui/material";

import React from "react";
import AddFirmModal from "../components/AddFirmModal";

const Firms = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box
      sx={{
        color: "#ff0000",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Typography> FIRMS</Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#000000", // Siyah buton
          color: "#ffffff", // Buton yazı rengi beyaz
          "&:hover": {
            backgroundColor: "grey", // Mouse üzerine geldiğinde rengi
          },
        }}
        onClick={handleOpen}
      >
        Add Firm
      </Button>
      <AddFirmModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Firms;
