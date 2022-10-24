import { Chip, TableCell, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import { DeaksTable } from "../shared/components/DeaksTable";
import { FilterSection } from "../shared/components/FilterSection";
import { useSearch } from "../shared/hooks/useSearch";
import { StyledIconButton, StyledTableRow } from "../users/utils/userUtils";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { headings } from "./utils";
// import usePagination from "@mui/material/usePagination/usePagination";

export const DailyAttendance = () => {
  // const Paginations = usePagination(10);
  const { SearchInput, searchKeyword } = useSearch("Search Name");
  useEffect(() => {
    console.log(searchKeyword);
  }, [searchKeyword]);
  return (
    <ContentWrapper headerName="Daily Attendance">
      <FilterSection>
        {SearchInput}
        <TextField
          name="date"
          label="Select Date"
          size="small"
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
        />
      </FilterSection>
      <DeaksTable headings={headings}>
        <StyledTableRow hover role="checkbox" tabIndex={-1}>
          <TableCell key={``} align="left">
            Ravi pilla
          </TableCell>
          <TableCell key={``} align="left">
            <Chip label={"10:00am - 4:00pm"} />
          </TableCell>
          <TableCell key={``} align="left">
            <Chip label={"On The Way"} />
          </TableCell>
          <TableCell key={``} align="left">
            <StyledIconButton size="small" aria-label="delete user">
              <OpenInNewIcon size="small" />
            </StyledIconButton>
          </TableCell>
        </StyledTableRow>
        <StyledTableRow hover role="checkbox" tabIndex={-1}>
          <TableCell key={``} align="left">
            Milan c
          </TableCell>
          <TableCell key={``} align="left">
            <Chip label={"10:00am - 4:00pm"} />
          </TableCell>
          <TableCell key={``} align="left">
            <Chip label={"Not Replayed"} />
          </TableCell>
          <TableCell key={``} align="left">
            <StyledIconButton size="small" aria-label="delete user">
              <OpenInNewIcon size="small" />
            </StyledIconButton>
          </TableCell>
        </StyledTableRow>
        <StyledTableRow hover role="checkbox" tabIndex={-1}>
          <TableCell key={``} align="left">
            Sharanya Vikram
          </TableCell>
          <TableCell key={``} align="left">
            <Chip label={"10:00am - 4:00pm"} />
          </TableCell>
          <TableCell key={``} align="left">
            <Chip label={"Ready"} />
          </TableCell>
          <TableCell key={``} align="left">
            <StyledIconButton size="small" aria-label="delete user">
              <OpenInNewIcon size="small" />
            </StyledIconButton>
          </TableCell>
        </StyledTableRow>
      </DeaksTable>
    </ContentWrapper>
  );
};
