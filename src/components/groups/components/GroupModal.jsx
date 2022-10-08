import React, { useEffect, useMemo, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { DeaksModal } from "../../shared/components/DeaksModal";
import { useHotelFilter } from "../../shared/hooks/useHotelFilter";
import { Button, TextField } from "@mui/material";
import { useFetchUsers } from "../../shared/hooks/useFetchUsers";
import { addGroup } from "../../shared/services/groupServices";
import { NotificationManager } from "react-notifications";
import { formErrors } from "../utils/utils";

export const GroupModal = ({ modalOpen, setModalOpen, modalType }) => {
  const users = useFetchUsers();
  const { HotelSelectList, selectedHotel } = useHotelFilter();
  const [visibility, setVisibility] = React.useState("Public");
  const [personName, setPersonName] = React.useState([]);
  const [groupName, setGroupName] = React.useState("");
  const [error, setError] = useState("");
  // const [personName, setPersonName] = React.useState([]);

  const names = {};
  users.filter((item) => {
    return (names[item._id] = item.name);
  });

  const handleChangeVisibility = (event, newVisibility) => {
    setVisibility(newVisibility);
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const modalHeader = modalType === "add" ? "Add Group" : "Update Group";

  const onSaveHandler = async () => {
    if (!groupName) {
      setError(formErrors.addNameError);
      return;
    }
    if (visibility === "Privet" && !selectedHotel) {
      setError(formErrors.hotelSelectError);
      return;
    }
    if (!personName.length > 0) {
      setError(formErrors.addMembersError);
      return;
    }
    setError("");

    const payload = {
      groupTitle: groupName,
      groupType: visibility,
      groupMembers: personName,
      hotel: selectedHotel,
    };
    if (modalType === "add") {
      try {
        const groupAdd = await addGroup(payload);
        console.log(groupAdd);
      } catch (error) {
        NotificationManager.error(error);
      }
    }
    console.log(payload);
  };

  return (
    <DeaksModal
      modalHeader={modalHeader}
      modalOpen={modalOpen}
      modalWidth={650}
      setModalOpen={setModalOpen}
    >
      <div className="groupWrapper">
        <ToggleButtonGroup
          color="primary"
          value={visibility}
          exclusive
          onChange={handleChangeVisibility}
          aria-label="Platform"
        >
          <ToggleButton value="Public">Public</ToggleButton>
          <ToggleButton value="Privet">Privet</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          fullWidth
          size="small"
          label="Group Name"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />

        <FormControl sx={{}} fullWidth size="small">
          <InputLabel id="MembersListSelect">Add Members</InputLabel>
          <Select
            isClearable={true}
            labelId="demo-mutiple-chip-label"
            id="MembersListSelect"
            multiple
            value={personName}
            onChange={handleChange}
            input={
              <OutlinedInput label="Add Members" id="select-multiple-chip" />
            }
            renderValue={(selected) => (
              <div className={""}>
                {selected.map((value) => (
                  <Chip key={value} label={names[value]} className={""} />
                ))}
              </div>
            )}
          >
            {Object.keys(names).map((id) => (
              <MenuItem key={id} value={id}>
                {names[id]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {visibility === "Privet" ? HotelSelectList : ""}
      </div>
      {error ? <p style={{ color: "red" }}>{error}</p> : ""}
      <Button
        sx={{ background: "black", float: "right" }}
        variant="contained"
        onClick={onSaveHandler}
      >
        {modalType === "add" ? "Save Group" : "Update Group"}
      </Button>
    </DeaksModal>
  );
};
