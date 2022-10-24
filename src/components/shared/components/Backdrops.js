import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

function Backdrops({ open }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Backdrops;