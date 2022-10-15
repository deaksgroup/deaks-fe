import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Stack } from "@mui/system";
import VisibilityPanel from "./VisibilityPanel";
import InfoPanel from "./InfoPanel";

function StatusPanel() {
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
          value="18"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="Confirmed"
          value="12"
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
          value="23"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          id="Waiting"
          value="0"
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
          value="6"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="Priority"
          value="High"
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
