import React from "react";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityPanel from "./VisibilityPanel";
import InfoPanel from "./InfoPanel";
import { useSlotsQuery } from "../../../hooks/useSlots";
import { useParams } from "react-router-dom";

function StatusPanel() {
  const { slotId } = useParams();
  const { data } = useSlotsQuery(slotId);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="statusPanelWrapper">
      <div className="headerCard">
        <div className="headerName">
          <p>About Slot</p>
        </div>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <SettingsIcon />
        </IconButton>
      </div>
      <div className="items">
        <TextField
          id="Required"
          key={"req"}
          label="Vacancy"
          value={data?.vacancy}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="Confirmed"
          value={data?.confirmedRequests?.length}
          label="Filled"
          key={"Confirmed"}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="Released"
          label="Released"
          key={"Released"}
          value={data?.release}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          id="Waiting"
          value={data?.waitingRequests?.length}
          label="Waiting"
          key={"Waiting"}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="Shortfall"
          className=""
          label={"Shortfall"}
          key={"shortfall"}
          value={data?.vacancy - data?.confirmedRequests.length}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="Priority"
          value={data?.priority}
          label="Priority"
          key={"Priority"}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <VisibilityPanel />
      <InfoPanel />
      <Menu
        id="aboutMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem size="small" onClick={handleClose}>
          Cancel Slot
        </MenuItem>
        <MenuItem size="small" onClick={handleClose}>
          Add High priority
        </MenuItem>
      </Menu>
    </div>
  );
}

export default StatusPanel;
