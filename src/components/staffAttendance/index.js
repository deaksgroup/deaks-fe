import React, { useState, useCallback, useMemo,useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { StyledIconButton, StyledTableRow } from "../users/utils/userUtils";
import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
import { CloseOutlined, DoneOutlineOutlined } from "@mui/icons-material";
import { Button, MenuItem, Select, Stack, TableCell, TextField, FormControl, InputLabel } from "@mui/material";
import { DeaksTable } from "../shared/components/DeaksTable";
import { usePagination } from "../shared/hooks/usePagination";
import "../attendance/style/attendenceStyle.css";
import { staffAttendanceHeading } from "./utils";
import { UseStaffAttendencelist } from "./hooks/useSelfAttendance";
import { getHotels } from "../shared/services/hotelServices";
import { getOutlets } from "../shared/services/outletServices";
export const StaffAttendance = () => {
  const navigate = useNavigate();
  const [staffAttendance, setStaffAttendance] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [initialValues, setInitialValues] = useState({
    "startDate": "2022-11-04T18:30:00.000+00:00",
    "endDate": "2022-11-20T18:30:00.000+00:00",
    "status": "",
    "hotel": "",
    "outlet": "",
    "searchQuery": "",
  })
  const Paginations = usePagination(20);
  useEffect(() => {
    getAllStaffAttendancelist();
  }, [
    Paginations.props.rowsPerPage,
    Paginations.props.page,
  ])
  const getAllStaffAttendancelist = () => {
    const param = {
      "startDate":initialValues.startDate,
      "endDate": initialValues.endDate,
      "status": initialValues.status,
      "hotel": initialValues.hotel,
      "outlet": initialValues.outlet,
      "pageNum": 1,
      "pageSize": Paginations.props.rowsPerPage,
      "skip": Paginations.props.page * Paginations.props.rowsPerPage,
    }
    UseStaffAttendencelist(param).then((res) => {
      if (res?.data?.staff_attendance_list) {
        setStaffAttendance(res?.data?.staff_attendance_list);
        setTotalCount(res?.data?.total_users);
      }
    });
  }
  //Fetch all hotel details
  const queryParams = React.useMemo(() => {
    return {
      name: "",
      sortBy: "",
      orderBy: "",
      limit: "1000",
      skip: "0",
    };
  }, []);
  const fetchHotels = useCallback(async () => {
    try {
      const response = await getHotels(queryParams);
      setHotelData(response.data);
    } catch (error) {
      NotificationManager.error(error);
    }
  }, [queryParams]);
  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  //fetch outlet details 
  const searchParams = useMemo(() => {
    return {
      outletName: "",
      hotel: selectedHotel,
      sortBy: "",
      orderBy: "",
      limit: "1000",
      skip: "",
    };
  }, [
    selectedHotel
  ]);

  const fetchOutlets = useCallback(async () => {
    try {
      const outletData = await getOutlets(searchParams);
      setOutlets(outletData?.data);
    } catch (error) {
      NotificationManager.error(error);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchOutlets();
  }, [fetchOutlets]);

  const onclickCancel = () => {
    setInitialValues({
      "startDate": "2022-11-04T18:30:00.000+00:00",
      "endDate": "2022-11-20T18:30:00.000+00:00",
      "status": "",
      "hotel": "",
      "outlet": "",
      "searchQuery": "",
    })
    const param = {
      "startDate": "2022-11-04T18:30:00.000+00:00",
      "endDate": "2022-11-20T18:30:00.000+00:00",
      "status": "",
      "hotel": "",
      "outlet": "",
      "searchQuery": "",
      "pageNum": 1,
      "pageSize": Paginations.props.rowsPerPage,
      "skip": Paginations.props.page * Paginations.props.rowsPerPage,
    }
    UseStaffAttendencelist(param).then((res) => {
      if (res?.data?.staff_attendance_list) {
        setStaffAttendance(res?.data?.staff_attendance_list);
      }
    });
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((prev) => {
      return { ...prev, [name]: value }
    })
    if (name === "hotel") {
      setSelectedHotel(value)
    }
    if (name === "searchQuery") {
      getAllStaffAttendancelist()
    }
  }
  return (
    <ContentWrapper headerName="Staff Attendance">
            <div className="attendanceFilterDiv">
        <TextField
          label="Starting Date"
          InputLabelProps={{ shrink: true }}
          className="card"
          type="date"
          name="startDate"
          value={initialValues.startDate}
          onChange={handleChange}
          size="small" />
        <TextField
          label="Ending Date"
          InputLabelProps={{ shrink: true }}
          className="card"
          type="date"
          name="endDate"
          value={initialValues.endDate}
          onChange={handleChange}
          size="small" />
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-helper-label">
            Select Hotel
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="hotel"
            name="hotel"
            label="Select Hotel"
            onChange={handleChange}
            value={initialValues.hotel}
          >
            {hotelData.map((item, index) => (
              <MenuItem key={item._id} value={item._id}>
                {item.hotelName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-helper-label">
            Select Outlet
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="hotel"
            name="outlet"
            label="Select Hotel"
            onChange={handleChange}
            value={initialValues.outlet}
          >
            {outlets.map((item, index) => (
              <MenuItem key={item._id} value={item._id}>
                {item.outletName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel size="small" id="status">
            Status
          </InputLabel>
          <Select
            className="card"
            size="small"
            name="status"
            value={initialValues.status}
            labelId="verificationStatus"
            id="verificationStatus"
            onChange={handleChange}
            label="Verification Status"
          >
            <MenuItem size="small" value={"PENDING"}>
              PENDING
            </MenuItem>
            <MenuItem size="small" value={"CONFIRMED"}>
              CONFIRMED
            </MenuItem>
            <MenuItem size="small" value={"OTW"}>
              OTW
            </MenuItem>
            <MenuItem size="small" value={"REPORTED"}>
              REPORTED
            </MenuItem>
            <MenuItem size="small" value={"NO SHOW"}>
              NO SHOW
            </MenuItem>
          </Select>
        </FormControl>
        <div className="card">
          <Button onClick={getAllStaffAttendancelist}>SUBMIT</Button>
          <Button onClick={onclickCancel}>CANCEL</Button>
        </div>

      </div>
      <DeaksTable headings={staffAttendanceHeading}>
        {staffAttendance.map((item, index) => {
          return (
            <StyledTableRow hover role="staffattendance" tabIndex={-1} key={index}>
              <TableCell  align="left">
                  {item.id}
                </TableCell>
                <TableCell  align="left">
                  {item.attendanceNo}
                </TableCell>
                <TableCell  align="left">
                  {item.fullName}
                </TableCell>
                <TableCell  align="left">
                  {item.contactDetails}
                </TableCell>
                <TableCell  align="left">
                  {item.hotelName}
                </TableCell>
                <TableCell  align="left">
                  {item.outletName}
                </TableCell>
                <TableCell  align="left">
                  {item.date}
                </TableCell>
                <TableCell  align="left">
                  {item.status}
                </TableCell>
                <TableCell  align="left">
                  {item.startTime}
                </TableCell>
                <TableCell  align="left">
                  {item.endTime}
                </TableCell>
                <TableCell  align="left">
                  {item.totalHours}
                </TableCell>
                <TableCell  align="left">
                  {item.hourlyPay}
                </TableCell>
                <TableCell  align="left">
                  {item.totalPay}
                </TableCell>
                <TableCell key={`${item._id}`} align="left">
                  <Stack direction="row" spacing={1}>
                    <StyledIconButton
                      size="small"
                      aria-label="delete Hotel"

                    >
                      <DeleteOutlinedIcon size="small" />
                    </StyledIconButton>
                    <StyledIconButton
                      size="small"
                      aria-label="Edit User"
                      onClick={() => {
                        navigate(`/staff-attendance-edit/${item._id}`)
                      }}
                    >
                      <ModeEditOutlineOutlined size="small" />
                    </StyledIconButton>
                  </Stack>
                </TableCell>
            </StyledTableRow>
          );
        })}
      </DeaksTable>





      {Paginations}
    </ContentWrapper>
  );
};
