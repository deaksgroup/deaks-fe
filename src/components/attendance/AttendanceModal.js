import { Button, TextField, Autocomplete, FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import Backdrops from "../shared/components/Backdrops";
import * as Yup from 'yup';
import moment from 'moment'

const hotel = [{
  id: 1,
  value: "hotelname"
},
{
  id: 2,
  value: "hotelname2"
}, {
  id: 3,
  value: "hotelname3"
},
]

const Staff = [{
  id: 1,
  value: "Staff"
},
{
  id: 2,
  value: "Staff2"
},
{
  id: 3,
  value: "Staff3"
},
{
  id: 4,
  value: "Staff4"
},
]

const Outlet = [{
  id: 1,
  value: "Outlet"
},
{
  id: 2,
  value: "Outlet2"
}, {
  id: 3,
  value: "Outlet3"
},
]
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
  const [avatarPreview, setAvatarPreview] = useState("");
  const [selectedExclusiveUsers, setSelectedExclusiveUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const { modalType, setModalOpen,
    fetchHotels, hotelInfo, selectedHotelInfo,
    userData, endTime, startTime,
    attendencedata, setslotUsers, slotUsers, selectedSlot } =
    props;

  const [initialValues, setInitialValues] = useState({
    AttendanceCreatedDate: attendencedata ? attendencedata?.date.date : '',
    HotelName: attendencedata ? attendencedata.hotel : '',
    AttendanceStatus: attendencedata ? attendencedata.status : '',
    OutletName: attendencedata ? attendencedata.outlet : '',
    AddStaff: [],
    StartTime: "",
    EndTime: ""
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: '',
    onSubmit: async (values) => {
      console.log(values);
      if (attendencedata) {
        console.log(values);
        console.log(slotUsers);
      } else {
        const {
          AttendanceCreatedDate,
          HotelName,
          AttendanceStatus,
          OutletName,
          AddStaff,
          StartTime,
          EndTime,
        } = values;
        console.log(values);
        let formData = new FormData();
        formData.append("AttendanceCreatedDate", AttendanceCreatedDate); //append the values with key, value pair
        formData.append("HotelName", HotelName);
        formData.append("AttendanceStatus", AttendanceStatus);
        formData.append("OutletName", OutletName);
        formData.append("AddStaff", AddStaff);
        formData.append("StartTime", StartTime);
        formData.append("EndTime", EndTime);
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
            onChange={handleChange}
            size="small"
            value={attendencedata?.date ?? ''}
            InputProps={{ sx: { height: 55 } }}
            InputLabelProps={{ shrink: true, required: true }}
            error={formik.touched.AttendanceCreatedDate && Boolean(formik.errors.AttendanceCreatedDate)}
            helperText={formik.touched.AttendanceCreatedDate && formik.errors.AttendanceCreatedDate}
          />
          {attendencedata?._id ?
            <TextField
              id="HotelName"
              name="HotelName"
              label="Hotel Name"
              onChange={handleChange}
              value={attendencedata?.hotel}
            />
            :
            <TextField
              id="HotelName"
              name="HotelName"
              label="Hotel Name"
              select
              value={formik.values.HotelName}
              onChange={formik.handleChange}
              error={formik.touched.HotelName && Boolean(formik.errors.HotelName)}
              helperText={formik.touched.HotelName && formik.errors.HotelName}
            >
              {hotel.map((item, index) => (
                <MenuItem key={item.id} value={item.value} >
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          }

          {attendencedata?._id ?
            <TextField
              id="OutletName"
              name="OutletName"
              label="Outlet Name"
              onChange={handleChange}
              value={attendencedata?.outlet}
            /> :
            <TextField
              id="OutletName"
              name="OutletName"
              label="Outlet Name"
              select
              value={formik.values.OutletName}
              onChange={formik.handleChange}
              error={formik.touched.OutletName && Boolean(formik.errors.OutletName)}
              helperText={formik.touched.OutletName && formik.errors.OutletName}
            >
              {Outlet.map((item, index) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>}
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
          <TextField
            id="StartTime"
            name="StartTime"
            label="Start Time"
            type="time"
            onChange={handleChange}
          // value={moment(startTime).format("hh:mm A")}
          />
          <TextField
            id="EndTime"
            name="EndTime"
            type="time"
            label="End Time"
            onChange={handleChange}
          // value={ moment(endTime).format("hh:mm A")}
          />
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
              onChange=""
              label="Slot Status"
            >
              <MenuItem size="small" value={"Pending"}>
                Pending
              </MenuItem>
              <MenuItem size="small" value={"Completed"}>
                completed
              </MenuItem>
              <MenuItem size="small" value={"Not Submitted"}>
                Not Submitted
              </MenuItem>
            </Select>
          </FormControl>
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
