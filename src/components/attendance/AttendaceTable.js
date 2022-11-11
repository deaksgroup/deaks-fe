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
export const Attendance = () => {
  const [hotelData, setHotelData] = useState(
    [
      {
        "_id": "6367cb03cf40fae278709142",
        "id": "A19",
        "attendanceName": "D23W44 hotelName slotName",
        "dateObj": "2022-11-09T18:30:00.000Z",
        "status": "PENDING STAFF",
        "isAmended": false,
        "isApproved": false,
        "hotelName": "Sample Hotel",
        "outletName": "Scarlet English"
      },
      {
        "_id": "635bb8ee645108fee2341323",
        "id": "A18",
        "attendanceName": "D23W44 hotelName slotName",
        "dateObj": "2022-11-07T18:30:00.000Z",
        "hotelName": "Sample Hotel",
        "outletName": "Scarlet English"
      },
      {
        "_id": "635bb8d8645108fee2341309",
        "id": "A17",
        "attendanceName": "D23W44 hotelName slotName",
        "dateObj": "2022-11-06T18:30:00.000Z",
        "hotelName": "Sample Hotel",
        "outletName": "Scarlet English"
      },
      {
        "_id": "635bb8ad645108fee23412ef",
        "id": "A16",
        "attendanceName": "D23W44 hotelName slotName",
        "dateObj": "2022-11-05T18:30:00.000Z",
        "isAmended": false,
        "isApproved": true,
        "status": "PENDING STAFF",
        "hotelName": "Sample Hotel",
        "outletName": "Scarlet English"
      },
      {
        "_id": "635bb800645108fee23412bb",
        "id": "A14",
        "attendanceName": "D23W43 hotelName slotName",
        "dateObj": "2022-11-04T18:30:00.000Z",
        "isAmended": false,
        "isApproved": false,
        "status": "PENDING STAFF",
        "hotelName": "Sacha Hanson",
        "outletName": "Heather Rosario"
      },
      {
        "_id": "635bb844645108fee23412d5",
        "id": "A15",
        "attendanceName": "D23W44 hotelName slotName",
        "dateObj": "2022-11-04T18:30:00.000Z",
        "isAmended": false,
        "status": "SENT",
        "isApproved": false,
        "hotelName": "Sample Hotel",
        "outletName": "Scarlet English"
      }
    ]
  );
  const Paginations = usePagination(20);
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
        {hotelData.map((item, index) => {
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
                    // onClick={() => {
                    //   handleEditHotel(item._id);
                    // }}
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
