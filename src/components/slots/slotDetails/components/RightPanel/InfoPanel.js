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

function InfoPanel() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="InfoPanelWrapper">
      <div className="items">
        <TextField
          id="Starts"
          key={"starts"}
          label="Starts In"
          value="2d. 33h"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="payHour"
          value="12"
          label="$/hour"
          key={"payHour"}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="duty"
          label="Duty Time"
          key={"duty"}
          value="8 Hours"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
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
        <MenuItem size="small" onClick={handleClose}>
          Turn Off Dedicated Filter
        </MenuItem>
      </Menu>
    </div>
  );
}

export default InfoPanel;
