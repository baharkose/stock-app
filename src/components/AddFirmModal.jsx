import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { TextField } from "@mui/material";
import useFirm from "../service/useFirm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddFirmModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const { createFirm } = useFirm();

  const [formData, setFormData] = useState({
    firstname: "",
    phone: "",
    address: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
    createFirm(formData)
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Form
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            variant="outlined"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              hidden
              name="image"
              onChange={handleChange}
              
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
