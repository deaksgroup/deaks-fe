import React, { useState } from "react";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import { DeaksTable } from "../shared/components/DeaksTable";
import { usePagination } from "../shared/hooks/usePagination";
import "./style/attendenceStyle.css";
import { StyledIconButton, StyledTableRow } from "../users/utils/userUtils";
import { attendanceHeading } from "./attendanceheading";
import { Button, MenuItem, Select, Stack, TableCell, TextField } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
import { CloseOutlined, DoneOutlineOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {UseAttendencelist} from './hooks/useAttendence'
import { useEffect } from "react";
export const Attendance = () => {
  const navigate=useNavigate();
  const [totalCount, setTotalCount] = useState("");
  const [attendanceData, setAttendanceData] = useState([ ]);
  const Paginations = usePagination(totalCount);
  useEffect(()=>{
    getAllAttendancelist();
  },[])
  const getAllAttendancelist = () =>{
  const param={
    "startDate":"2022-11-04T18:30:00.000+00:00",
    "endDate":"2022-11-20T18:30:00.000+00:00",
    "status":"",
    "hotel":"",
    "outlet":"",
    "searchQuery":"",
    "pageNum":1,
    "pageSize": Paginations.props.rowsPerPage,
    "skip": Paginations.props.page * Paginations.props.rowsPerPage,
}
   UseAttendencelist(param).then((res)=>{
      console.log(res.data);
      if(res?.data?.attendanceList){
        setAttendanceData(res?.data?.attendanceList);
        setTotalCount(2);
          }
    });
  }


  
  return (
    <ContentWrapper headerName="Attendance">
      <div className="attendanceFilterDiv">
        <TextField
          type="date"
          name="starting date"
          size="small" />
        <TextField
          type="date"
          size="small" />

        <Select
          size="small"
          name="verificationStatus"
          labelId="verificationStatus"
          id="verificationStatus"
          defaultValue={"Not Submitted"}
          label="Verification Status"
        >
          <MenuItem size="small" value={"Pending"}>
            Pending
          </MenuItem>
          <MenuItem size="small" value={"Completed"}>
            Completed
          </MenuItem>
          <MenuItem size="small" value={"Not Submitted"}>
            Not Submitted
          </MenuItem>
        </Select>
        <Select
          size="small"
          name="verificationStatus"
          labelId="verificationStatus"
          id="verificationStatus"
          defaultValue={"Not Submitted"}
          label="Verification Status"
        >
          <MenuItem size="small" value={"Pending"}>
            Pending
          </MenuItem>
          <MenuItem size="small" value={"Completed"}>
            Completed
          </MenuItem>
          <MenuItem size="small" value={"Not Submitted"}>
            Not Submitted
          </MenuItem>
        </Select>
        <Select
          size="small"
          name="verificationStatus"
          labelId="verificationStatus"
          id="verificationStatus"
          defaultValue={"Not Submitted"}
          label="Verification Status"
        >
          <MenuItem size="small" value={"Pending"}>
            Pending
          </MenuItem>
          <MenuItem size="small" value={"Completed"}>
            Completed
          </MenuItem>
          <MenuItem size="small" value={"Not Submitted"}>
            Not Submitted
          </MenuItem>
        </Select>
        <div>
          <Button>SUBMIT</Button>
          <Button>CANCEL</Button>
        </div>

      </div>
      <div className="attendanceCountDiv">
        <div className="attendanceCount">count1</div>
        <div className="staffCount">count2</div>
      </div>
      <div className="attendanceSearchDiv">
        <TextField />
      </div>
      <DeaksTable headings={attendanceHeading}>
        {attendanceData?.map((item, index) => {
          return (
            <StyledTableRow hover role="attendance" tabIndex={-1} key={index}>
              <>
                <TableCell key={`${item.id}`} align="left">
                  {item.id}
                </TableCell>
                <TableCell key={`${item.attendanceName}`} align="left">
                  {item.attendanceName}
                </TableCell>
                <TableCell key={`${item.hotelName}`} align="left">
                  {item.hotelName}
                </TableCell>
                <TableCell key={`${item.outletName}`} align="left">
                  {item.outletName}
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
                        navigate(`/edit-attendance/${item._id}`)
                      }}
                    >
                      <ModeEditOutlineOutlined size="small" />
                    </StyledIconButton>
                  </Stack>
                </TableCell>
                <TableCell key={`${item.isAmended}`} align="left">
                  {item.isAmended ? <StyledIconButton
                    size="small"
                    aria-label="delete Hotel"

                  >
                    <DoneOutlineOutlined size="small" />
                  </StyledIconButton> : <StyledIconButton
                    size="small"
                    aria-label="delete Hotel"

                  >
                    <CloseOutlined size="small" />
                  </StyledIconButton>}
                </TableCell>
                <TableCell key={`${item.isApproved}`} align="left">
                  {item.isApproved ? <StyledIconButton
                    size="small"
                    aria-label="delete Hotel"

                  >
                    <DoneOutlineOutlined size="small" />
                  </StyledIconButton> : <StyledIconButton
                    size="small"
                    aria-label="delete Hotel"

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
