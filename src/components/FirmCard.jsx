import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useStockCalls from "../service/useStockCalls";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { btnStyle } from "../styles/globalStyles";

export default function FirmCard({ firm, handleOpen, setInfo }) {
  const { deleteStock } = useStockCalls();
  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "300px",
        height: "400px",
        p: 2,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {firm?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {firm?.address}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt={firm?.name}
        height="140"
        image={firm?.image}
        sx={{ objectFit: "contain" }}
      />
      <Typography variant="body2" color="text.secondary">
        {firm.phone}
      </Typography>
      <CardActions>
        <DeleteForeverOutlined
          sx={btnStyle}
          onClick={() => {
           deleteStock("firms", firm?._id)
          }}
        />
      </CardActions>
    </Card>
  );
}
