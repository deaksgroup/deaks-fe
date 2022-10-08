import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import {
  addHotel,
  getUpdateHotelInfo,
} from "../../shared/services/hotelServices";
import { outletModalValidation } from "../utils/outletModalValidation";

export const OutletModal = (props) => {
  const { modalType, setModalOpen, fetchHotels, hotelInfo, selectedHotelInfo } =
    props;

  const [initialValues, setInitialValues] = useState({
    SOAemail: "",
    hotelName: "",
    longitude: "",
    latitude: "",
  });
  useEffect(() => {
    if (modalType === "Edit Hotel") {
      setInitialValues(hotelInfo);
    }
  }, [hotelInfo, modalType]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: outletModalValidation,

    onSubmit: async (values) => {
      console.log("modalType", modalType);
      if (modalType === "Add Hotel") {
        try {
          await addHotel(values);
          NotificationManager.success("Hotel Added sucessfully");
          setModalOpen(false);
          fetchHotels();
        } catch (error) {
          NotificationManager.success(error);
        }
      } else {
        try {
          const params = {
            hotelId: selectedHotelInfo,
            updatedValue: values,
          };
          await getUpdateHotelInfo(params);
          NotificationManager.success("Hotel Updates sucessfully");
          setModalOpen(false);
          fetchHotels();
        } catch (error) {
          NotificationManager.success(error);
        }
      }
      // const params = {
      //   updatedValue: values,
      // };
      // try {
      //   NotificationManager.success("User updated sucessfully");
      // } catch (error) {
      //   NotificationManager.error(error);
      // }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="hotelsFormWrapper">
          <TextField
            id="outletName"
            name="outletName"
            label="Outlet Name"
            value={formik.values.outletName}
            onChange={formik.handleChange}
            error={
              formik.touched.outletName && Boolean(formik.errors.outletName)
            }
            helperText={formik.touched.outletName && formik.errors.outletName}
            size="small"
          />
          <TextField
            id="SOAemail"
            name="SOAemail"
            label="SOA Email"
            value={formik.values.SOAemail}
            onChange={formik.handleChange}
            size="small"
            error={formik.touched.SOAemail && Boolean(formik.errors.SOAemail)}
            helperText={formik.touched.SOAemail && formik.errors.SOAemail}
          />
          <TextField
            id="longitude"
            name="longitude"
            label="Longitude"
            value={formik.values.longitude}
            onChange={formik.handleChange}
            size="small"
            error={formik.touched.longitude && Boolean(formik.errors.longitude)}
            helperText={formik.touched.longitude && formik.errors.longitude}
          />
          <TextField
            id="Latitude"
            name="latitude"
            label="Latitude"
            value={formik.values.latitude}
            onChange={formik.handleChange}
            size="small"
            error={formik.touched.latitude && Boolean(formik.errors.latitude)}
            helperText={formik.touched.latitude && formik.errors.latitude}
          />
        </div>

        <Button
          sx={{
            marginTop: "20px",
            background: "#1976d2",
            float: "right",
            width: "110px",
            height: "45px",
          }}
          variant="contained"
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};
