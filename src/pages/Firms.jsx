import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

import AddFirmModal from "../components/AddFirmModal";
import useStockCalls from "../service/useStockCalls";

const Firms = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { getFirms } = useStockCalls();

  // sayfa yüklendiğinde backendden verileri çek.
  useEffect(() => {
    getFirms();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={3}>
        {" "}
        FIRMS
      </Typography>
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
        New Firm
      </Button>
      <AddFirmModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Firms;
