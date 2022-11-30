import React, { useState, useEffect } from "react";
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

export const StaffAttendance = () => {
  const navigate = useNavigate();
  const [staffAttendance, setStaffAttendance] = useState([]);
  const Paginations = usePagination(20);
  useEffect(() => {
    getAllStaffAttendancelist();
  }, [
    Paginations.props.rowsPerPage,
    Paginations.props.page,
  ])
  const getAllStaffAttendancelist = () => {
    const param = {
      "startDate": "2022-11-04T18:30:00.000+00:00",
      "endDate": "2022-11-20T18:30:00.000+00:00",
      "status": "",
      "hotel": "",
      "outlet": "",
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
  return (
    <ContentWrapper headerName="Staff Attendance">
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
