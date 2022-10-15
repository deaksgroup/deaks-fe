import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Autocomplete,
  Button,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { useFetchHotels } from "../../shared/hooks/useFetchHotels";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { NewSlotModal } from "./NewSlotModal";
import { ContentWrapper } from "../../shared/components/ContentWrapper";
import { getOutlets } from "../../shared/services/outletServices";
import {
  addNewSlots,
  fetchExistingSlots,
} from "../../shared/services/slotsServices";
import { NewSlotsTable } from "./NewSlotsTable";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

export const AddNewSlots = () => {
  const [openNewSlotModal, setOpenNewSlotModal] = useState(false);
  const [outletList, setOutletList] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const [formEditMode, setFormEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState([]);
  const [initialValues, setInitialValues] = useState({
    date: "",
    hotel: "",
    hotelName: "",
    outlet: "",
    outletName: "",
  });

  const hotelList = useFetchHotels();
  const { date, hotel, hotelName, outlet, outletName } = initialValues;

  const hotelOption = useMemo(() => {
    const hotels = hotelList?.map((item) => {
      return {
        id: item._id,
        label: item?.hotelName,
      };
    });
    return hotels;
  }, [hotelList]);

  const outletOption = useMemo(() => {
    const hotels = outletList?.map((item) => {
      return {
        id: item._id,
        label: item?.outletName,
      };
    });
    return hotels;
  }, [outletList]);

  const fetchOutlets = useCallback(async () => {
    const searchParam = {
      hotel,
    };
    const outletList = await getOutlets(searchParam);
    setOutletList(outletList?.data);
  }, [hotel]);

  const handleSaveSlots = async () => {
    try {
      const newSlots = await addNewSlots({
        newSlots: tableValues,
        date,
        hotel,
        outlet,
        attendanceName: "D23W44 hotelName slotName",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOutlets();
    if (hotel && date && outlet) {
      fetchExistingSlots({
        date,
        hotel,
        outlet,
      });
    }
  }, [date, hotel, outlet, fetchOutlets]);

  return (
    <ContentWrapper ContentWrapper headerName="Add new Slot">
      <div className="outletFormWrapper">
        <div className="outletInitialDetails">
          <TextField
            name="date"
            label="Select Date"
            size="small"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            value={date}
            onChange={(e) => {
              setInitialValues({ ...initialValues, date: e.target.value });
            }}
          />

          <Autocomplete
            id="hotel"
            inputValue={hotelName}
            size="small"
            options={hotelOption}
            renderInput={(params) => (
              <TextField {...params} value="" label="Select Hotel" />
            )}
            noOptionsText={"No Hotel Found"}
            onChange={(event, newValue) => {
              setInitialValues({
                ...initialValues,
                hotel: newValue?.id,
                hotelName: newValue?.label,
                outletName: "",
              });
            }}
          />
          {hotel ? (
            <Autocomplete
              id="outlet"
              size="small"
              options={outletOption}
              inputValue={outletName}
              renderInput={(params) => (
                <TextField {...params} value="" label="Select Outlet" />
              )}
              noOptionsText={"No Outlets"}
              onChange={(event, newValue) => {
                setInitialValues({
                  ...initialValues,
                  outlet: newValue?.id,
                  outletName: newValue?.label,
                });
              }}
            />
          ) : (
            ""
          )}
        </div>
        <Divider sx={{ my: 6 }} />

        {date && hotel && outlet ? (
          <div className="createSlotsWrapper">
            <div className="slotDetail">
              <h3>Add Slots</h3>
              <Divider orientation="vertical" flexItem />
              <h3 className="slotName">W23D223 Dec 3 Rithz catltron slots</h3>
              <IconButton aria-label="delete" color="primary">
                <ModeEditOutlinedIcon />
              </IconButton>

              <Button
                className="addSlotButton"
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                onClick={() => {
                  setOpenNewSlotModal(true);
                  setFormEditMode(false);
                }}
              >
                New Slot
              </Button>
            </div>
            <div className="newSlotItemTable">
              <NewSlotsTable
                tableValues={tableValues}
                setEditFormData={setEditFormData}
                setOpenNewSlotModal={setOpenNewSlotModal}
                setFormEditMode={setFormEditMode}
                formEditMode={formEditMode}
                setEditRowIndex={setEditRowIndex}
                setTableValues={setTableValues}
              />
              <Button
                className="addSlotButton"
                variant="contained"
                startIcon={<SaveOutlinedIcon />}
                onClick={() => {
                  handleSaveSlots();
                  // setOpenNewSlotModal(true);
                  // setFormEditMode(false);
                }}
              >
                Save Slot{" "}
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <NewSlotModal
        open={openNewSlotModal}
        setOpen={setOpenNewSlotModal}
        hotel={hotel}
        tableValues={tableValues}
        setTableValues={setTableValues}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        setFormEditMode={setFormEditMode}
        formEditMode={formEditMode}
        setEditRowIndex={setEditRowIndex}
        editRowIndex={editRowIndex}
      />
    </ContentWrapper>
  );
};
