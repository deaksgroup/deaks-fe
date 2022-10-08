import React, { useState } from "react";
import {
  AppBar,
  Autocomplete,
  Button,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import { useFetchHotels } from "../../shared/hooks/useFetchHotels";
import { useFetchOutlets } from "../../shared/hooks/useFetchOutlets";

export const SlotFullscreenDialog = () => {
  const [initialValues, setInitialValues] = useState({
    date: "",
    hotel: "",
    outlet: "",
  });
  const hotelList = useFetchHotels();
  const outletList = useFetchOutlets();

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog
      fullScreen
      open={true}
      //   onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative", background: "black" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={""}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add New Slot
          </Typography>
          <Button
            autoFocus
            color="inherit"
            // onClick={formik.handleSubmit}
            type="submit"
            form="outletForm"
          >
            {/* {dialogType === "add" ? "Add" : "Update"} */}
            Add
          </Button>
        </Toolbar>
      </AppBar>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={() => {}}
        id="slotForm"
      >
        {(props) => (
          <div className="outletFormWrapper">
            <div className="outletInitialDetails">
              <TextField
                name="date"
                label="Select Date"
                size="small"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                value={props?.values?.date || ""}
                onChange={props.handleChange}
                error={props.touched.date && Boolean(props.errors.date)}
                helperText={props.touched.date && props.errors.date}
              />

              <Autocomplete
                id="hotel"
                size="small"
                options={outletList.map((option) => option.outletName)}
                renderInput={(params) => (
                  <TextField {...params} value="" label="Select Hotel" />
                )}
                value={props?.values?.hotel || ""}
                onChange={props.handleChange}
                error={props.touched.hotel && Boolean(props.errors.hotel)}
                helperText={props.touched.hotel && props.errors.hotel}
              />

              <Autocomplete
                id="outlet"
                size="small"
                options={outletList.map((option) => option.outletName)}
                renderInput={(params) => (
                  <TextField {...params} value="" label="Select Outlet" />
                )}
                value={props?.values?.outlet || ""}
                onChange={props.handleChange}
                error={props.touched.outlet && Boolean(props.errors.outlet)}
                helperText={props.touched.outlet && props.errors.outlet}
              />
            </div>
            <Divider sx={{ my: 6 }} />

            <div className="createSlotsWrapper">
              <div className="slotDetail">
                <h3>Add Slots</h3> <Divider orientation="vertical" flexItem />
              </div>
              <div></div>
            </div>
          </div>
        )}
      </Formik>
    </Dialog>
  );
};
