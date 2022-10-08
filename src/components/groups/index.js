import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SpeedDial, SpeedDialIcon, TableCell } from "@mui/material";
import { ContentWrapper } from "../shared/components/ContentWrapper";

import "./style/groups.css";
import { useSearch } from "../shared/hooks/useSearch";
import { FilterSection } from "../shared/components/FilterSection";
import { GroupModal } from "./components/GroupModal";
import { DeaksTable } from "../shared/components/DeaksTable";
import { headings } from "./utils/utils";
import { usePagination } from "../shared/hooks/usePagination";
import { fetchGroups } from "../shared/services/groupServices";
import { useHotelFilter } from "../shared/hooks/useHotelFilter";
import { StyledIconButton, StyledTableRow } from "../users/utils/userUtils";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Stack } from "@mui/system";

export const Groups = () => {
  const { SearchInput, searchKeyword } = useSearch("Search Groups");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [groups, setGroups] = useState([]);
  const { HotelSelectList, selectedHotel } = useHotelFilter();
  const Paginations = usePagination(20);
  const query = useMemo(() => {
    return {
      groupTitle: searchKeyword,
      hotel: selectedHotel,
      sortBy: "",
      orderBy: "",
      limit: Paginations.props.rowsPerPage,
      skip: Paginations.props.page * Paginations.props.rowsPerPage,
    };
  }, [
    searchKeyword,
    selectedHotel,
    Paginations.props.rowsPerPage,
    Paginations.props.page,
  ]);

  const userGroups = useCallback(async () => {
    try {
      const groupsInfo = await fetchGroups(query);
      setGroups(groupsInfo?.data);
    } catch (error) {
      console.log(error);
    }
  }, [query]);

  useEffect(() => {
    userGroups();
  }, [userGroups]);

  return (
    <ContentWrapper headerName="Groups">
      <FilterSection>
        {SearchInput}
        {HotelSelectList}
      </FilterSection>
      <DeaksTable headings={headings}>
        {groups.map((item, index) => {
          return (
            <StyledTableRow hover role="table" tabIndex={-1} key={index}>
              <>
                <TableCell key={`grp${item.groupTitle}`} align="left">
                  {item.groupTitle}
                </TableCell>
                <TableCell key={`vis${item.groupType + index}`} align="left">
                  {item.groupType}
                </TableCell>
                <TableCell key={`hotel${index}`} align="left">
                  {item?.hotel?.hotelName || "-"}
                </TableCell>
                <TableCell key={`${item.groupMembers}`} align="left">
                  {item.groupMembers.length}
                </TableCell>

                <TableCell key={`${item._id}`} align="left">
                  <Stack direction="row" spacing={1}>
                    <StyledIconButton
                      size="small"
                      aria-label="delete Hotel"
                      onClick={() => {}}
                    >
                      <DeleteOutlinedIcon size="small" />
                    </StyledIconButton>
                    <StyledIconButton
                      size="small"
                      aria-label="Edit User"
                      onClick={() => {}}
                    >
                      <ModeEditOutlineOutlinedIcon size="small" />
                    </StyledIconButton>
                  </Stack>
                </TableCell>
              </>
            </StyledTableRow>
          );
        })}
      </DeaksTable>
      <SpeedDial
        ariaLabel="SpeedDial for Outlets"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => {
          setModalOpen(true);
        }}
      ></SpeedDial>
      {Paginations}

      <GroupModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalType={modalType}
        setModalType={setModalType}
      />
    </ContentWrapper>
  );
};
