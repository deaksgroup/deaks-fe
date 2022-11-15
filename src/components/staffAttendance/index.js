import React, { useState } from "react";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import { DeaksTable } from "../shared/components/DeaksTable";
import { usePagination } from "../shared/hooks/usePagination";
import "../hotels/styles/hotels.css";
import {  StyledTableRow } from "../users/utils/userUtils";
import { staffAttendanceHeading } from "./utils";

export const StaffAttendance = () => {
  const [staffAttendance, setStaffAttendance] = useState([]); 
  const Paginations = usePagination(20);
  return (
    <ContentWrapper headerName="Staff Attendance">
  
      <DeaksTable headings={staffAttendanceHeading}>
        {staffAttendance.map((item, index) => {
          return (
            <StyledTableRow hover role="staffattendance" tabIndex={-1} key={index}>
              <>
                {/* <TableCell key={`${item.hotelName}`} align="left">
                  {item.hotelName} 
                </TableCell>
                <TableCell key={`${item.SOAmail}`} align="left">
                  {item.SOAmail}
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
                        handleEditHotel(item._id);
                      }}
                    >
                      <ModeEditOutlineOutlinedIcon size="small" />
                    </StyledIconButton>
                  </Stack>
                </TableCell> */}
              </>
            </StyledTableRow>
          );
        })}
      </DeaksTable>

      
     

    
      {Paginations}
    </ContentWrapper>
  );
};
