import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStockCalls from "../service/useStockCalls";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import FirmCard from "../components/FirmCard";
// import FirmCard from "../components/FirmCard";
// import FirmModal from "../components/FirmModal";

const Firms = () => {
  const { getStocks } = useStockCalls();
  const { firms } = useSelector((state) => state.stock);
  // console.log(firms);
  // global state'ten firmaları getirdik.
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo({
      name: "",
      phone: "",
      address: "",
      image: "",
    });
  };

  useEffect(() => {
    // getFirms()
    getStocks("firms");
  }, []);

  console.log(firms);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        {/* açma işlemini aktif hale getir. */}
        New Firm
      </Button>
      {/* 
      <FirmModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      /> */}

      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {firms?.map((firm) => (
          <Grid item key={firm._id}>
            <FirmCard firm={firm} handleOpen={handleOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;
