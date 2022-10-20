import { SpeedDial, SpeedDialIcon, Stack, TableCell } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import { DeaksTable } from "../shared/components/DeaksTable";
import { FilterSection } from "../shared/components/FilterSection";
import { useSearch } from "../shared/hooks/useSearch";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { StyledIconButton, StyledTableRow } from "../users/utils/userUtils";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import "./styles/style.css";
import OutletFullscreenDialog from "./components/OutletFullscreenDialog";
import { headings } from "./utils/outletUtils";
import {
  deleteOutletById,
  getOutlets,
} from "../shared/services/outletServices";
import { NotificationManager } from "react-notifications";
import { useHotelFilter } from "../shared/hooks/useHotelFilter";
import { usePagination } from "../shared/hooks/usePagination";
import DeaksDialog from "../shared/components/DeaksDialog";

export const Outlet = () => {
  const Paginations = usePagination("20");
  const { SearchInput, searchKeyword } = useSearch("Search Outlets");
  const { HotelSelectList, selectedHotel } = useHotelFilter();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [dialogType, setDialogType] = useState("Add");
  const [selectedDeleteOutlet, setSelectedDeleteOutlet] = useState("");

  const searchParams = useMemo(() => {
    return {
      outletName: searchKeyword,
      hotel: selectedHotel,
      sortBy: "",
      orderBy: "",
      limit: Paginations.props.rowsPerPage,
      skip: Paginations.props.page * Paginations.props.rowsPerPage,
    };
  }, [
    selectedHotel,
    searchKeyword,
    Paginations.props.rowsPerPage,
    Paginations.props.page,
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

  const modalHandler = () => {
    setModalOpen(true);
  };

  const deleteOutlet = useCallback(async () => {
    try {
      await deleteOutletById(selectedDeleteOutlet);
      NotificationManager.success("Outlet deleted successfully");
      setDeleteDialogOpen(false);
      fetchOutlets();
    } catch (error) {
      console.log(error);
      NotificationManager.error("Outlet deleted failed");
    }
  }, [fetchOutlets, selectedDeleteOutlet]);

  return (
    <ContentWrapper headerName="Outlets">
      <FilterSection>
        {SearchInput}
        {HotelSelectList}
      </FilterSection>
      <DeaksTable headings={headings}>
        {outlets?.map((outlet, index) => {
          return (
            <StyledTableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={outlet._id}
            >
              <TableCell key={`name${index}`} align="left">
                {outlet?.outletName}
              </TableCell>
              <TableCell key={`hotel${index}`} align="left">
                {outlet?.hotel?.hotelName}
              </TableCell>

              <TableCell key={`action${index}`} align="left">
                <Stack direction="row" spacing={1}>
                  <StyledIconButton
                    size="small"
                    aria-label="delete user"
                    onClick={() => {
                      setDeleteDialogOpen(true);
                      setSelectedDeleteOutlet(outlet._id);
                    }}
                  >
                    <DeleteOutlinedIcon size="small" />
                  </StyledIconButton>
                  <StyledIconButton
                    size="small"
                    aria-label="Edit User"
                    onClick={() => {
                      setSelectedOutlet(outlet._id);
                      setModalOpen(true);
                      setDialogType("update");
                    }}
                  >
                    <ModeEditOutlineOutlinedIcon size="small" />
                  </StyledIconButton>
                </Stack>
              </TableCell>
            </StyledTableRow>
          );
        })}
      </DeaksTable>
      {Paginations}
      <DeaksDialog
        heading="DELETE HOTEL"
        message="The outlet will get permanently deleted, do you wish to continue ?"
        okButton="Yes"
        cancelButton="Cancel"
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        confirmFunction={deleteOutlet}
      />
      <SpeedDial
        onClick={() => {
          modalHandler();
        }}
        ariaLabel="SpeedDial for Outlets"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      ></SpeedDial>
      <OutletFullscreenDialog
        open={modalOpen}
        setOpen={setModalOpen}
        selectedOutlet={selectedOutlet}
        dialogType={dialogType}
        setDialogType={setDialogType}
      />
    </ContentWrapper>
  );
};
