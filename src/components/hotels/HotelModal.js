import { Avatar, Button, IconButton, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { ImageView } from "../shared/helper/util";
import { addHotel, getUpdateHotelInfo } from "../shared/services/hotelServices";
import { hotalModalValidation } from "./utils/hotalModalValidation";
import UploadIcon from "@mui/icons-material/Upload";
import Backdrops from "../shared/components/Backdrops";

export const HotelModal = (props) => {
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { modalType, setModalOpen, fetchHotels, hotelInfo, selectedHotelInfo } =
    props;

  const [initialValues, setInitialValues] = useState({
    SOAmail: "",
    hotelName: "",
    googleMapLink: "",
    appleMapLink: "",
    Abbreviation: "",
    adminNumber: "",
    hotelLogo: "",
  });
  useEffect(() => {
    if (modalType === "Edit Hotel") {
      setInitialValues(hotelInfo);
      const image = ImageView(hotelInfo?.hotelLogo || "");
      setAvatarPreview(image);
    }
  }, [hotelInfo, modalType]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: hotalModalValidation,

    onSubmit: async (values) => {
      const {
        Abbreviation,
        SOAmail,
        appleMapLink,
        googleMapLink,
        hotelName,
        hotelLogo,
        fileName,
        adminNumber,
      } = values;
      let formData = new FormData();
      formData.append("Abbreviation", Abbreviation); //append the values with key, value pair
      formData.append("SOAmail", SOAmail);
      formData.append("appleMapLink", appleMapLink);
      formData.append("googleMapLink", googleMapLink);
      formData.append("hotelName", hotelName);
      formData.append("hotelLogo", hotelLogo);
      formData.append("filename", fileName);
      formData.append("adminNumber", adminNumber);

      if (modalType === "Add Hotel") {
        try {
          setLoading(true);
          await addHotel(formData);
          NotificationManager.success("Hotel Added successfully");
          setModalOpen(false);
          fetchHotels();
        } catch (error) {
          setLoading(false);
          NotificationManager.success(error);
        }
      } else {
        try {
          setLoading(true);
          const params = {
            hotelId: selectedHotelInfo,
            updatedValue: values,
          };
          await getUpdateHotelInfo(params);
          NotificationManager.success("Hotel Updates successfully");
          setModalOpen(false);
          fetchHotels();
        } catch (error) {
          setLoading(false);
          NotificationManager.success(error);
        }
      }
      // const params = {
      //   updatedValue: values,
      // };
      // try {
      //   NotificationManager.success("User updated successfully");
      // } catch (error) {
      //   NotificationManager.error(error);
      // }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="hotelsFormWrapper">
          <TextField
            id="hotelName"
            name="hotelName"
            label="Hotel Name"
            value={formik.values.hotelName}
            onChange={formik.handleChange}
            error={formik.touched.hotelName && Boolean(formik.errors.hotelName)}
            helperText={formik.touched.hotelName && formik.errors.hotelName}
            size="small"
          />
          <TextField
            id="SOAmail"
            name="SOAmail"
            label="SOA Email"
            value={formik.values.SOAmail}
            onChange={formik.handleChange}
            size="small"
            error={formik.touched.SOAmail && Boolean(formik.errors.SOAmail)}
            helperText={formik.touched.SOAmail && formik.errors.SOAmail}
          />
          <TextField
            id="Abbreviation"
            name="Abbreviation"
            label="Abbreviation"
            value={formik.values.Abbreviation}
            onChange={formik.handleChange}
            size="small"
            error={
              formik.touched.Abbreviation && Boolean(formik.errors.Abbreviation)
            }
            helperText={
              formik.touched.Abbreviation && formik.errors.Abbreviation
            }
          />
          <TextField
            id="adminNumber"
            name="adminNumber"
            label="adminNumber"
            type="number"
            value={formik.values.adminNumber}
            onChange={formik.handleChange}
            size="small"
            error={
              formik.touched.adminNumber && Boolean(formik.errors.adminNumber)
            }
            helperText={formik.touched.adminNumber && formik.errors.adminNumber}
          />
          <TextField
            id="googleMapLink"
            name="googleMapLink"
            label="Google Map Link"
            value={formik.values.googleMapLink}
            onChange={formik.handleChange}
            size="small"
            error={
              formik.touched.googleMapLink &&
              Boolean(formik.errors.googleMapLink)
            }
            helperText={
              formik.touched.googleMapLink && formik.errors.googleMapLink
            }
          />
          <TextField
            id="appleMapLink"
            name="appleMapLink"
            label="Apple Map Link"
            value={formik.values.appleMapLink}
            onChange={formik.handleChange}
            size="small"
            error={
              formik.touched.appleMapLink && Boolean(formik.errors.appleMapLink)
            }
            helperText={
              formik.touched.appleMapLink && formik.errors.appleMapLink
            }
          />

          <div className="hotelIconUpload">
            <p>Hotel Logo:</p>
            <br></br>
            <Avatar size="md" src={avatarPreview} />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                name="hotelLogo"
                accept="image/*"
                id="contained-button-file"
                type="file"
                hidden
                onChange={(e) => {
                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      formik.setFieldValue("hotelLogo", e.target.files[0]);
                      formik.setFieldValue(
                        "fileName",
                        e.target.files[0].name || "hotelLogo"
                      );
                      setAvatarPreview(fileReader.result);
                    }
                  };
                  fileReader.readAsDataURL(e.target.files[0]);
                }}
              />
              <UploadIcon />
            </IconButton>
            {!avatarPreview ? (
              <p style={{ color: "red" }}>Please add a logo</p>
            ) : (
              ""
            )}
            {/* <Button
              variant="contained"
              component="label"
              // startIcon={<UploadIcon />}
            >
              <input
                name="hotelLogo"
                accept="image/*"
                id="contained-button-file"
                type="file"
                hidden
                onChange={(e) => {
                  const fileReader = new FileReader();
                  console.log(e.target.files[0]);
                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      console.log({ fileReader });
                      formik.setFieldValue("hotelLogo", e.target.files[0]);
                      formik.setFieldValue(
                        "fileName",
                        e.target.files[0].name || "hotelLogo"
                      );
                      setAvatarPreview(fileReader.result);
                    }
                  };
                  fileReader.readAsDataURL(e.target.files[0]);
                }}
              />
            </Button> */}
          </div>
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
      <Backdrops open={loading} />
    </div>
  );
};
