import { Backdrop, SpeedDial, SpeedDialIcon, TableCell } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import { DeaksModal } from "../shared/components/DeaksModal";
import { DeaksTable } from "../shared/components/DeaksTable";
import { FilterSection } from "../shared/components/FilterSection";
import { usePagination } from "../shared/hooks/usePagination";
import { useSearch } from "../shared/hooks/useSearch";
import { HotelModal } from "./HotelModal";
import { hotelHeadings } from "./utils/hotelUtils";
import "./styles/hotels.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  deleteHotelApi,
  getHotelInfo,
  getHotels,
} from "../shared/services/hotelServices";
import { NotificationManager } from "react-notifications";
import { StyledIconButton, StyledTableRow } from "../users/utils/userUtils";
import { Stack } from "@mui/system";
import DeaksDialog from "../shared/components/DeaksDialog";
import Backdrops from "../shared/components/Backdrops";

export const Hotels = () => {
  const { SearchInput, searchKeyword } = useSearch("Search Hotels");
  const [hotelData, setHotelData] = useState([]);
  const [hotelInfo, setHotelInfo] = useState({});
  const [selectedHotelInfo, setSelectedHotelInfo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteHotel, setSelectedDeleteHotel] = useState("");
  const Paginations = usePagination(20);

  const queryParams = useMemo(() => {
    return {
      name: searchKeyword,
      sortBy: "",
      orderBy: "",
      limit: Paginations.props.rowsPerPage,
      skip: Paginations.props.page * Paginations.props.rowsPerPage,
    };
  }, [Paginations.props.rowsPerPage, Paginations.props.page, searchKeyword]);

  // trigger Delete modal
  const triggerDelete = useCallback((id) => {
    setDeleteDialogOpen(true);
    setSelectedDeleteHotel(id);
  }, []);

  const fetchHotels = useCallback(async () => {
    try {
      const response = await getHotels(queryParams);
      console.log(response.data);
      setHotelData(response.data);
    } catch (error) {
      NotificationManager.error(error);
    }
  }, [queryParams]);

  const deleteHotel = useCallback(async () => {
    try {
      await deleteHotelApi(selectedDeleteHotel);
      NotificationManager.success("Hotel deleted successfully");
      setDeleteDialogOpen(false);
      fetchHotels();
    } catch (error) {
      setDeleteDialogOpen(false);
    }
  }, [fetchHotels, selectedDeleteHotel]);

  const speedDialClickHandler = () => {
    setModalType("Add Hotel");
    setModalOpen(true);
  };

  const handleEditHotel = useCallback(async (id) => {
    setLoading(true);
    try {
      const info = await getHotelInfo(id);
      setModalType("Edit Hotel");
      setModalOpen(true);
      setSelectedHotelInfo(id);
      const {
        SOAmail,
        hotelName,
        googleMapLink,
        appleMapLink,
        Abbreviation,
        hotelLogo,
        adminNumber,
      } = info.data;
      setHotelInfo({
        SOAmail: SOAmail,
        hotelName: hotelName,
        googleMapLink: googleMapLink,
        appleMapLink: appleMapLink,
        Abbreviation: Abbreviation,
        hotelLogo: hotelLogo,
        adminNumber: adminNumber,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      NotificationManager.error(error);
    }
  }, []);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);
  return (
    <ContentWrapper headerName="Hotels">
      <FilterSection>{SearchInput}</FilterSection>
      <DeaksTable headings={hotelHeadings}>
        {hotelData.map((item, index) => {
          return (
            <StyledTableRow hover role="table" tabIndex={-1} key={index}>
              <>
                <TableCell key={`${item.hotelName}`} align="left">
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
                      onClick={() => {
                        triggerDelete(item._id);
                      }}
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
                </TableCell>
              </>
            </StyledTableRow>
          );
        })}
      </DeaksTable>

      <DeaksModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalHeader={modalType}
        modalWidth={700}
      >
        <HotelModal
          modalType={modalType}
          setModalOpen={setModalOpen}
          fetchHotels={fetchHotels}
          hotelInfo={hotelInfo}
          selectedHotelInfo={selectedHotelInfo}
        />
      </DeaksModal>
      <DeaksDialog
        heading="DELETE HOTEL"
        message="Every data belongs to this hotel will get deleted from the database, are you sure to continue ?"
        okButton="Yes"
        cancelButton="Cancel"
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        confirmFunction={deleteHotel}
      />
      <Backdrops open={loading} />
      <SpeedDial
        onClick={speedDialClickHandler}
        ariaLabel="SpeedDial for hotels"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      ></SpeedDial>
      {Paginations}
    </ContentWrapper>
  );
};
