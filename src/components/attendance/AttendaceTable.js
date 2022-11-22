import React, { useState, useCallback, useMemo } from "react";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import { DeaksTable } from "../shared/components/DeaksTable";
import { usePagination } from "../shared/hooks/usePagination";
import "./style/attendenceStyle.css";
import { StyledIconButton, StyledTableRow } from "../users/utils/userUtils";
import { attendanceHeading } from "./attendanceheading";
import { Button, MenuItem, Select, Stack, TableCell, TextField, FormControl, InputLabel } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
import { CloseOutlined, DoneOutlineOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { updateAmend, updateAprove, UseAttendencelist } from './hooks/useAttendence'
import { useEffect } from "react";
import { getHotels } from "../shared/services/hotelServices";
import { getOutlets } from "../shared/services/outletServices";
import { NotificationManager } from "react-notifications";
export const Attendance = () => {
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState("");
  const [totalStaff, setTotalStaff] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const Paginations = usePagination(totalCount);
  const [hotelData, setHotelData] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("")
  const [initialValues, setInitialValues] = useState({
    "startDate": "2022-11-04T18:30:00.000+00:00",
    "endDate": "2022-11-20T18:30:00.000+00:00",
    "status": "",
    "hotel": "",
    "outlet": "",
    "searchQuery": "",
  })
  useEffect(() => {
    getAllAttendancelist();
  }, [])
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

  const getAllAttendancelist = () => {
    const param = {
      "startDate": initialValues?.startDate,
      "endDate": initialValues?.endDate,
      "status": initialValues?.status,
      "hotel": initialValues?.hotel,
      "outlet": initialValues?.outlet,
      "searchQuery": initialValues?.searchQuery,
      "pageNum": 1,
      "pageSize": Paginations.props.rowsPerPage,
      "skip": Paginations.props.page * Paginations.props.rowsPerPage,
    }
    UseAttendencelist(param).then((res) => {
      console.log(res.data);
      if (res?.data?.attendanceList) {
        setAttendanceData(res?.data?.attendanceList);
        setTotalCount(res?.data?.totalRecords);
        setTotalStaff(res?.data?.userCount)
      }
    });
  }
  const onclickCancel = () => {
    setInitialValues({
      "startDate": "2022-11-04T18:30:00.000+00:00",
      "endDate": "2022-11-20T18:30:00.000+00:00",
      "status": "",
      "hotel": "",
      "outlet": "",
      "searchQuery": "",
    })
    const params = {
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
    UseAttendencelist(params).then((res) => {
      if (res?.data?.attendanceList) {
        setAttendanceData(res?.data?.attendanceList);
        setTotalCount(res?.data?.totalRecords);
        setTotalStaff(res?.data?.userCount)
      }
    });
  }
  const amending = (id) => {
    updateAmend(id).then((res) => {
      getAllAttendancelist()
    })

  }
  const aproving = (id) => {
    updateAprove(id).then((res) => {
      getAllAttendancelist()
    })

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
      getAllAttendancelist()
    }
  }

  return (
    <ContentWrapper headerName="Attendance">
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
        </FormControl>
        <div className="card">
          <Button onClick={getAllAttendancelist}>SUBMIT</Button>
          <Button onClick={onclickCancel}>CANCEL</Button>
        </div>

      </div>
      <div className="attendanceCountDiv">
        <div className="attendanceCount">Total No.of Attendances :{"  " + totalCount}</div>
        <div className="staffCount">Total Staff Working : {" " + totalStaff}</div>
      </div>
      <div className="attendanceSearchDiv">
        <TextField size="small"
          name="searchQuery"
          onChange={handleChange}
          value={initialValues.searchQuery} />
      </div>
      <DeaksTable headings={attendanceHeading}>
        {attendanceData?.map((item) => {
          return (
            <StyledTableRow hover role="attendance" tabIndex={-1} key={item._id}>
              <>
                <TableCell align="left">
                  {item.id}
                </TableCell>
                <TableCell align="left">
                  {item.attendanceName}
                </TableCell>
                <TableCell align="left">
                  {item.hotelName}
                </TableCell>
                <TableCell align="left">
                  {item.outletName}
                </TableCell>
                <TableCell align="left">
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
                        navigate(`/edit-attendance/${item._id}`)
                      }}
                    >
                      <ModeEditOutlineOutlined size="small" />
                    </StyledIconButton>
                  </Stack>
                </TableCell>
                <TableCell align="left">
                  {item.isAmended ? <StyledIconButton
                    size="small"
                    aria-label="delete Hotel"
                  >
                    <DoneOutlineOutlined size="small" />
                  </StyledIconButton> : <StyledIconButton
                    size="small"
                    aria-label="delete Hotel"
                    onClick={() => { amending(item._id) }}
                  >
                    <CloseOutlined size="small" />
                  </StyledIconButton>}
                </TableCell>
                <TableCell align="left">
                  {item.isApproved ? <StyledIconButton
                    size="small"
                    aria-label="delete Hotel"
                  >
                    <DoneOutlineOutlined size="small" />
                  </StyledIconButton> : <StyledIconButton
                    size="small"
                    aria-label="delete Hotel"
                    onClick={() => { aproving(item._id) }}
                  >
                    <CloseOutlined size="small" />
                  </StyledIconButton>}
                </TableCell>
              </>
            </StyledTableRow>
          );
        })}
      </DeaksTable>





      {Paginations}
    </ContentWrapper>
  );
};
