import { Button, TextField, Autocomplete, FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import Backdrops from "../shared/components/Backdrops";
import * as Yup from 'yup';
import { Addnewslot } from './hooks/useAttendence'
import { NotificationManager } from "react-notifications";
const FormValidation = Yup.object().shape({

  AttendanceCreatedDate: Yup
    .date()
    .required('please enter a valid date'),
  // HotelName: Yup
  //   .string()
  //   .required('please enter Hotel name'),
  AttendanceStatus: Yup
    .string()
    .required('please select a valid option'),
  // OutletName: Yup
  //   .string()
  //   .required('please enter Outlet name'),
  StartTime: Yup
    .string()
    .required('please enter a valid Time'),
  EndTime: Yup
    .string()
    .required('please enter a valid Time'),
  AddStaff: Yup
    .array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        value: Yup.string()
      })
    ).min(1, "Please select a valid option")
})
export const AttendanceModal = (props) => {
  const [selectedExclusiveUsers, setSelectedExclusiveUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const { userData, availableattendenceData, attendencedata, setslotUsers, slotUsers, selectedSlot } = props;
  const [initialValues, setInitialValues] = useState({
    AttendanceCreatedDate: attendencedata ? attendencedata?.date : availableattendenceData?.date,
    HotelName: attendencedata ? attendencedata.hotelName : availableattendenceData?.hotelName,
    AttendanceStatus: attendencedata ? attendencedata.status : '',
    OutletName: attendencedata ? attendencedata.outletName : availableattendenceData?.outletName,
    AddStaff: [],
    StartTime: attendencedata ? attendencedata.startTime : "",
    EndTime: attendencedata ? attendencedata.endTime : "",
    SlotStatus: '',
    SlotNAME: attendencedata ? attendencedata.slotNAME : "",
    PayPerHour: attendencedata ? attendencedata.PayPerHour : '',
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: '',
    onSubmit: async (values) => {
      if (attendencedata) {
        console.log(values);
        const {
          AttendanceCreatedDate,
          HotelName,
          AttendanceStatus,
          OutletName,
          AddStaff,
          StartTime,
          EndTime,
          PayPerHour,
          SlotNAME,
          SlotStatus
        } = values;
        let formData = new FormData();
        formData.append("AttendanceCreatedDate", AttendanceCreatedDate);
        formData.append("HotelName", HotelName);
        formData.append("AttendanceStatus", AttendanceStatus);
        formData.append("OutletName", OutletName);
        formData.append("AddStaff", AddStaff);
        formData.append("StartTime", StartTime);
        formData.append("EndTime", EndTime);
      } else {
        const {
          AttendanceCreatedDate,
          StartTime,
          EndTime,
          SlotNAME,
          PayPerHour,
          SlotStatus
        } = values;
        console.log(values);
        let userArray = [];
        if (values.AddStaff) {
          values.AddStaff?.map((item) =>
            userArray.push(item.id)
          );
        }
        let formData = new FormData();
        formData.append("attendance_id", availableattendenceData?._id)
        formData.append("date", AttendanceCreatedDate);
        formData.append("hotel_id", availableattendenceData?.hotelId);
        formData.append("slot_status", SlotStatus);
        formData.append("outlet_id", availableattendenceData?.outletId);
        formData.append("users", userArray);
        formData.append("start", StartTime);
        formData.append("end", EndTime);
        formData.append("shift_name", SlotNAME);
        formData.append("hourlypay", PayPerHour)
        Addnewslot(formData).then((res) => {
          if (res?.message?.code === 200) {
            NotificationManager.success("Added Successfully");
          } else {
            NotificationManager.error("Added Failed");
          }
        })
      }
    }
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((prev) => {
      return { ...prev, [name]: value }
    })

  }
  // Saving selected users in useState
  const onChangeSelectedUsers = (users) => {
    console.log(users);
    setslotUsers(users);
    let userArray = [];
    users?.map((item) => userArray.push(item.id));
    setSelectedExclusiveUsers(userArray);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="hotelsFormWrapper">
          <TextField
            id="AttendanceCreatedDate"
            name="AttendanceCreatedDate"
            type="date"
            label="Attendance Date"
            size="small"
            value={attendencedata?.date ?? availableattendenceData?.date}
            InputProps={{ sx: { height: 55 } }}
            InputLabelProps={{ shrink: true, required: true }}
            disabled
          />
          {attendencedata?._id ?
            <TextField
              id="HotelName"
              name="HotelName"
              label="Hotel Name"
              value={attendencedata?.hotelName}
              disabled
            />
            :
            <TextField
              id="HotelName"
              name="HotelName"
              label="Hotel Name"
              value={availableattendenceData?.hotelName}
              disabled />
          }

          {attendencedata?._id ?
            <TextField
              id="OutletName"
              name="OutletName"
              label="Outlet Name"
              value={attendencedata?.outletName}
              disabled
            /> :
            <TextField
              id="OutletName"
              name="OutletName"
              label="Outlet Name"
              value={availableattendenceData?.outletName}
              disabled
            >
            </TextField>}
          {attendencedata?._id ?
            <TextField
              id="SLOTNAME"
              name="SLOTNAME"
              label="Slot Name"
              value={attendencedata?.slotNAME}
              disabled
            />
            :
            <TextField
              id="SlotNAME"
              name="SlotNAME"
              label="Slot NAME"
              value={formik.values.SlotNAME}
              onChange={handleChange}
            />
          }


          {attendencedata?._id ?
            <Autocomplete
              multiple
              id="tags-outlined-group"
              getOptionSelected={(option, value) =>
                option.label === value.label
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={
                !userData
                  ? [{ label: "Loading...", id: 0 }]
                  : userData
              }
              value={
                !slotUsers
                  ? [{ label: "Loading...", id: 0 }]
                  : slotUsers
              }
              filterSelectedOptions
              onChange={(event, newValue) => {
                onChangeSelectedUsers(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Users" />
              )}
            />
            :
            <Autocomplete
              multiple
              id="AddStaff"
              name="AddStaff"
              options={userData}
              getOptionLabel={(option) => option.label}
              filterSelectedOptions
              onChange={(event, newValue) => {
                setInitialValues({
                  ...initialValues,
                  AddStaff: newValue,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Staff"
                  error={formik.touched.AddStaff && Boolean(formik.errors.AddStaff)}
                  helperText={formik.touched.AddStaff && formik.errors.AddStaff}
                />
              )}
            />

          }
          {attendencedata?._id ?
            <TextField
              id="PayPerHour"
              name="PayPerHour"
              label="Pay Per Hour"
              value={attendencedata?.PayPerHour}
              disabled
            />
            :
            <TextField
              id="PayPerHour"
              name="PayPerHour"
              label="Pay Per Hour"
              value={formik.values.PayPerHour}
              onChange={handleChange}
            />
          }
          {attendencedata?._id ?
            <TextField
              id="StartTime"
              name="StartTime"
              label="Start Time"
              type="time"
              onChange={handleChange}
              value={selectedSlot?.startTime}
            /> :
            <TextField
              id="StartTime"
              name="StartTime"
              label="Start Time"
              type="time"
              onChange={handleChange}
            />
          }
          {attendencedata?._id ?
            <TextField
              id="EndTime"
              name="EndTime"
              type="time"
              label="End Time"
              onChange={handleChange}
              value={selectedSlot?.endTime}
            /> :
            <TextField
              id="EndTime"
              name="EndTime"
              type="time"
              label="End Time"
              onChange={handleChange}
            />}
          {attendencedata?._id ?
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel size="small" id="verificationStatus">
                Slot Status
              </InputLabel>
              <Select
                size="small"
                name="slotStatus"
                labelId="slotStatus"
                id="slotStatus"
                value={selectedSlot?.status}
                onChange={handleChange}
                label="Slot Status"
              >
                <MenuItem size="small" value={"PENDING STAFF"}>
                  PENDING STAFF
                </MenuItem>
                <MenuItem size="small" value={"READY TO SEND"}>
                  READY TO SEND
                </MenuItem>
                <MenuItem size="small" value={"SEND"}>
                  SEND
                </MenuItem>
                <MenuItem size="small" value={"RECEIVED BACK"}>
                  RECEIVED BACK
                </MenuItem>
                <MenuItem size="small" value={"COMPLETED"}>
                  COMPLETED
                </MenuItem>
              </Select>
            </FormControl> :
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel size="small" id="SlotStatus">
                Slot Status
              </InputLabel>
              <Select
                size="small"
                name="SlotStatus"
                labelId="SlotStatus"
                id="SlotStatus"
                value={formik.values.SlotStatus}
                onChange={handleChange}
                label="Slot Status"
              >
                <MenuItem size="small" value={"PENDING STAFF"}>
                  PENDING STAFF
                </MenuItem>
                <MenuItem size="small" value={"READY TO SEND"}>
                  READY TO SEND
                </MenuItem>
                <MenuItem size="small" value={"SEND"}>
                  SEND
                </MenuItem>
                <MenuItem size="small" value={"RECEIVED BACK"}>
                  RECEIVED BACK
                </MenuItem>
                <MenuItem size="small" value={"COMPLETED"}>
                  COMPLETED
                </MenuItem>
              </Select>
            </FormControl>}
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
