import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
// import { validationSchema } from "./utils/userFormValidationSchema";
import { useEffect } from "react";
import { getUpdateUserInfo } from "../shared/services/usersService";
import { NotificationManager } from "react-notifications";
import { DeaksModal } from "../shared/components/DeaksModal";
import { ImageView } from "../shared/helper/util";

export const UserModal = (props) => {
  const { userInfo, fetchUsers, setModalOpen } = props;
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [initialValues, setInitialValues] = useState({
    userId: "",
    name: "",
    bookingName: "",
    Sex: "",
    DOB: "",
    contactNumber: "",
    email: "",
    collage: "",
    residentStatus: "",
    city: "",
    street: "",
    zipCode: "",
    unitNumber: "",
    emergencyContact: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    NRIC: "",
    PayNow: "",
    bankName: "",
    bankAccNo: "",
    accountStatus: "",
    jobStatus: "",
    verificationStatus: "",
    unauthorizedReason: "",
  });
  const { userId } = initialValues;
  useEffect(() => {
    setInitialValues({
      userId: userInfo._id,
      name: userInfo.name,
      bookingName: userInfo.bookingName,
      Sex: userInfo.Sex,
      DOB: userInfo.DOB,
      contactNumber: userInfo.contactNumber,
      email: userInfo.email,
      collage: userInfo.collage,
      residentStatus: userInfo.residentStatus,
      city: userInfo.city,
      street: userInfo.street,
      zipCode: userInfo.zipCode,
      unitNumber: userInfo.unitNumber,
      emergencyContact: userInfo.emergencyContact,
      emergencyContactName: userInfo.emergencyContactName,
      emergencyContactRelation: userInfo.emergencyContactRelation,
      NRIC: userInfo.NRIC,
      PayNow: userInfo.PayNow,
      bankName: userInfo.bankName,
      bankAccNo: userInfo?.bankAccNo,
      accountStatus: userInfo?.accountStatus,
      jobStatus: userInfo?.jobStatus,
      verificationStatus: userInfo?.verificationStatus,
      unauthorizedReason: userInfo?.unauthorizedReason,
    });
  }, [userInfo]);

  const handleImagePreview = (link) => {
    setImageModalOpen(true);
    setImageLink(link);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    // validationSchema: validationSchema,

    onSubmit: async (values) => {
      const params = {
        userId,
        updatedValue: values,
      };
      try {
        await getUpdateUserInfo(params);
        fetchUsers();
        setModalOpen(false);
        NotificationManager.success("User updated sucessfully");
      } catch (error) {
        NotificationManager.error(error);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <p className="BlockNameUserDataForm">User Personal Informations</p>
        <Divider light />
        <div className="infoBlock">
          <TextField
            id="name"
            name="name"
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
            size="small"
          />
          <TextField
            id="bookingName"
            name="bookingName"
            label="Booking Name"
            value={formik.values.bookingName}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel size="small" id="Sex">
              Sex
            </InputLabel>
            <Select
              labelId="Sex"
              id="Sex"
              name="Sex"
              value={formik.values.Sex}
              onChange={formik.handleChange}
              label="Sex"
              size="small"
            >
              <MenuItem key="male" size="small" value={"Male"}>
                Male
              </MenuItem>
              <MenuItem key="female" size="small" value={"Female"}>
                Female
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="date"
            size="small"
            id="DOB"
            name="DOB"
            label="DOB"
            value={formik.values.DOB}
            onChange={formik.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            size="small"
            id="contactNumber"
            name="contactNumber"
            label="Phone"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="collage"
            name="collage"
            label="Collage"
            value={formik.values.collage}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="residentStatus"
            name="residentStatus"
            label="Residence Status"
            value={formik.values.residentStatus}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="city"
            name="city"
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="street"
            name="street"
            label="Street"
            value={formik.values.street}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="zipCode"
            name="zipCode"
            label="Zip"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="unitNumber"
            name="unitNumber"
            label="Unit Number"
            value={formik.values.unitNumber}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="emergencyContact"
            name="emergencyContact"
            label="Emergency Contact"
            value={formik.values.emergencyContact}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="emergencyContactName"
            name="emergencyContactName"
            label="Emergency Contact Name"
            value={formik.values.emergencyContactName}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="emergencyContactRelation"
            name="emergencyContactRelation"
            label="Emergency Contact Relation"
            value={formik.values.emergencyContactRelation}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
        </div>
        <p className="BlockNameUserDataForm">Bank Information</p>
        <div className="infoBlock">
          <TextField
            id="NRIC"
            name="NRIC"
            label="NIRC"
            InputProps={{
              readOnly: true,
            }}
            value={formik.values.NRIC}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="PayNow"
            name="PayNow"
            label="Pay Now"
            value={formik.values.PayNow}
            onChange={formik.handleChange}
            size="small"
            InputProps={{
              readOnly: true,
            }}
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="bankName"
            name="bankName"
            label="Bank Name"
            value={formik.values.bankName}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
          <TextField
            id="bankAccNo"
            name="bankAccNo"
            label="Bank Account"
            value={formik.values.bankAccNo}
            onChange={formik.handleChange}
            size="small"
            // error={formik.touched.email && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.name}
          />
        </div>
        <div className="ImageBlock">
          <div className="profileImage">
            <p>Profile image:</p>
            {userInfo?.profilePicture ? (
              <img
                onClick={() => {
                  handleImagePreview(userInfo?.profilePicture);
                }}
                src={ImageView(userInfo?.profilePicture)}
                alt="profile_image"
              />
            ) : (
              "- No Image -"
            )}
          </div>
          <div className="attireImage">
            <p>Attire image:</p>
            {userInfo?.attirePictures?.length > 1 ? (
              <div className="imageStack">
                {userInfo?.attirePictures.map((item) => {
                  return (
                    <img
                      onClick={() => {
                        handleImagePreview(item);
                      }}
                      src={ImageView(item)}
                      alt="profile_image"
                    />
                  );
                })}
              </div>
            ) : (
              "- No images -"
            )}
          </div>
        </div>
        <p className="BlockNameUserDataForm">Deaks Information</p>
        <div className="infoBlock">
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel size="small" id="accountStatus">
              Account Status
            </InputLabel>
            <Select
              labelId="accountStatus"
              id="accountStatus"
              name="accountStatus"
              value={formik.values.accountStatus}
              onChange={formik.handleChange}
              label="Account Status"
              size="small"
            >
              <MenuItem key="null" size="small" value={""}></MenuItem>
              <MenuItem key="AUTHORIZED" value={"AUTHORIZED"}>
                Authorized
              </MenuItem>
              <MenuItem key="UNAUTHORIZED" value={"UNAUTHORIZED"}>
                Unauthorized
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel size="small" id="jobStatus">
              Job Status
            </InputLabel>
            <Select
              name="jobStatus"
              labelId="jobStatus"
              id="jobStatus"
              value={formik.values.jobStatus}
              onChange={formik.handleChange}
              label="Job Status"
              size="small"
            >
              <MenuItem key={"active"} size="small" value={"Active"}>
                Active
              </MenuItem>
              <MenuItem key={"activew"} size="small" value={"Not Active"}>
                Not Active
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel size="small" id="verificationStatus">
              Verification Status
            </InputLabel>
            <Select
              size="small"
              name="verificationStatus"
              labelId="verificationStatus"
              id="verificationStatus"
              value={formik.values.verificationStatus}
              onChange={formik.handleChange}
              label="Verification Status"
            >
              <MenuItem size="small" value={""}></MenuItem>
              <MenuItem size="small" value={"PENDING"}>
                Pending
              </MenuItem>
              <MenuItem size="small" value={"COMPLETED"}>
                Completed
              </MenuItem>
              <MenuItem size="small" value={"NOTSUBMITTED"}>
                Not Submitted
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="footerBar">
          {formik.values.accountStatus === "Unauthorized" ? (
            <TextField
              sx={{ width: "600px" }}
              error
              id="unauthorizedReason"
              name="unauthorizedReason"
              label="Unauthorized Reason"
              value={formik.values.unauthorizedReason}
              onChange={formik.handleChange}
              size="small"
              // error={formik.touched.email && Boolean(formik.errors.name)}
              // helperText={formik.touched.email && formik.errors.name}
            />
          ) : (
            ""
          )}
          <Button
            sx={{
              background: "black",
              float: "right",
              width: "110px",
              height: "45px",
              marginLeft: "auto",
            }}
            variant="contained"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
      <DeaksModal modalOpen={imageModalOpen} setModalOpen={setImageModalOpen}>
        <img src={ImageView(imageLink)} alt="imagePreview" />
      </DeaksModal>
    </div>
  );
};
