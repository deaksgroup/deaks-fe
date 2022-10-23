import React, { useEffect, useState } from "react";
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
import { useGetAllSlotData } from "./hooks/useSlots";
import { timeConv } from "../shared/helper/util";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const Slots = () => {
  const navigate = useNavigate();
  const Paginations = usePagination(20);
  const { SearchInput, searchKeyword } = useSearch("Search Slots");
  const [pageParameters, setPageParameters] = useState({
    page_num: 1,
    page_size: 10000,
    hotel_consolidated: true,
    hotel_id: "",
    outlet_consolidated: true,
    outlet_id: "",
    start_date: "",
    end_date: "",
    search_query: "",
  });

  // Query
  const { mutate: slotsDataFetch, data: slotData } = useGetAllSlotData();
  useEffect(() => {
    slotsDataFetch(pageParameters);
  }, [slotsDataFetch, pageParameters]);
  console.log(slotData);
  return (
    <ContentWrapper headerName="Slots">
      <FilterSection>{SearchInput}</FilterSection>
      <DeaksTable headings={headings}>
        {slotData?.map((item) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
              <>
                <TableCell key={`${""}`} align="left">
                  {item.id}
                </TableCell>
                <TableCell key={`${""}`} align="left">
                  {item.shiftName}
                </TableCell>
                <TableCell key={`${""}`} align="left">
                  <Chip
                    label={`${timeConv(item?.startTime)} - ${timeConv(
                      item?.endTime
                    )}`}
                  />
                </TableCell>
                <TableCell key={`${""}`} align="left">
                  <Chip label={!item?.isDeleted ? "Active" : "Deleted"} />
                </TableCell>
                <TableCell key={`${""}`} align="left">
                  {item.hotelDetails}
                </TableCell>
                <TableCell key={`${""}`} align="left">
                  {item.outletDetails}
                </TableCell>
                <TableCell key={`${""}`} align="left">
                  <Chip
                    avatar={
                      <Avatar>
                        <GroupIcon fontSize="small" />
                      </Avatar>
                    }
                    sx={{ background: "#C8E6C9" }}
                    label={
                      <p style={{ color: "#43A047" }}>
                        {item.confirmedRequests.length}/{item.vacancy}
                      </p>
                    }
                  />
                </TableCell>
                <TableCell key={`${""}`} align="left">
                  <Stack direction="row" spacing={1}>
                    <StyledIconButton
                      size="small"
                      aria-label="delete user"
                      onClick={() => {
                        navigate(`/slot/details/${item?._id}`);
                      }}
                    >
                      <OpenInNewIcon size="small" />
                    </StyledIconButton>
                  </Stack>
                </TableCell>
              </>
            </StyledTableRow>
          );
        })}
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
