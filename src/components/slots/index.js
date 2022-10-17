import React from "react";
import "./style/slots.css";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import { useSearch } from "../shared/hooks/useSearch";
import { FilterSection } from "../shared/components/FilterSection";
import { DeaksTable } from "../shared/components/DeaksTable";
import {
  Avatar,
  Chip,
  SpeedDial,
  SpeedDialIcon,
  TableCell,
} from "@mui/material";
import { headings } from "./helpers/utils";
import { usePagination } from "../shared/hooks/usePagination";
import { StyledIconButton, StyledTableRow } from "../users/utils/userUtils";
import { Stack } from "@mui/system";
import GroupIcon from "@mui/icons-material/Group";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./style/slots.css";
import { useNavigate } from "react-router-dom";

export const Slots = () => {
  const navigate = useNavigate();
  const Paginations = usePagination(20);
  const { SearchInput, searchKeyword } = useSearch("Search Slots");
  return (
    <ContentWrapper headerName="Slots">
      <FilterSection>{SearchInput}</FilterSection>
      <DeaksTable headings={headings}>
        <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
          <>
            <TableCell key={`${""}`} align="left">
              SRE321
            </TableCell>
            <TableCell key={`${""}`} align="left">
              6th May RITZ CARLTON.COLONY
            </TableCell>
            <TableCell key={`${""}`} align="left">
              <Chip label="10:00am - 5:00pm" />
            </TableCell>
            <TableCell key={`${""}`} align="left">
              <Chip
                sx={{ background: "#C8E6C9" }}
                label={<p style={{ color: "#43A047" }}>Finished</p>}
              />
            </TableCell>
            <TableCell key={`${""}`} align="left">
              Ritz Carlton
            </TableCell>
            <TableCell key={`${""}`} align="left">
              BANQUET
            </TableCell>
            <TableCell key={`${""}`} align="left">
              <Chip
                avatar={
                  <Avatar>
                    <GroupIcon fontSize="small" />
                  </Avatar>
                }
                sx={{ background: "#C8E6C9" }}
                label={<p style={{ color: "#43A047" }}>10/12</p>}
              />
            </TableCell>
            <TableCell key={`${""}`} align="left">
              <Stack direction="row" spacing={1}>
                <StyledIconButton
                  size="small"
                  aria-label="delete user"
                  onClick={() => {}}
                >
                  <MoreVertIcon size="small" />
                </StyledIconButton>
              </Stack>
            </TableCell>
          </>
        </StyledTableRow>

        <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
          <>
            <TableCell key={`${""}`} align="left">
              SRE321
            </TableCell>
            <TableCell key={`${""}`} align="left">
              7th May RITZ CARLTON
            </TableCell>
            <TableCell key={`${""}`} align="left">
              <Chip label="05:00pm - 11:00pm" />
            </TableCell>
            <TableCell key={`${""}`} align="left">
              <Chip
                sx={{ background: "#FFECB3" }}
                label={<p style={{ color: "#FF9800" }}>Pending</p>}
              />
            </TableCell>
            <TableCell key={`${""}`} align="left">
              Ritz Carlton
            </TableCell>
            <TableCell key={`${""}`} align="left">
              REPUBLIC
            </TableCell>
            <TableCell key={`${""}`} align="left">
              <Chip
                avatar={
                  <Avatar>
                    <GroupIcon fontSize="small" />
                  </Avatar>
                }
                sx={{ background: "#FFECB3" }}
                label={<p style={{ color: "#FF9800" }}>2/24</p>}
              />
            </TableCell>
            <TableCell key={`${""}`} align="left">
              <Stack direction="row" spacing={1}>
                <StyledIconButton
                  size="small"
                  aria-label="delete user"
                  onClick={() => {}}
                >
                  <MoreVertIcon size="small" />
                </StyledIconButton>
              </Stack>
            </TableCell>
          </>
        </StyledTableRow>
      </DeaksTable>
      {Paginations}
      <SpeedDial
        ariaLabel="SpeedDial for Outlets"
        onClick={() => {
          navigate("/addNewSlots");
        }}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      ></SpeedDial>
      {/* <SlotFullscreenDialog /> */}
    </ContentWrapper>
  );
};
