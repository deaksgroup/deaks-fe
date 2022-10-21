import React from "react";
import { Menu, MenuItem, TextField } from "@mui/material";
import { useSlotsQuery } from "../../../hooks/useSlots";
import { useParams } from "react-router-dom";
import moment from "moment";

function InfoPanel() {
  const { slotId } = useParams();
  const { data: slotInfos } = useSlotsQuery(slotId);
  const data = slotInfos?.[0];
  const currentDate = moment(new Date()).format("YYYY-MM-DD hh:mm");
  const slotStartTime = `${data?.date} ${data?.startTime}`;
  const slotEndTime = `${data?.date} ${data?.endTime}`;

  function durationAsString(start, end) {
    const duration = moment.duration(moment(end).diff(moment(start)));

    //Get Days
    const days = Math.floor(duration.asDays());
    const daysFormatted = days ? `${days}d ` : "";

    //Get Hours
    const hours = duration.hours();
    const hoursFormatted = `${hours}h `;

    //Get Minutes
    const minutes = duration.minutes();
    const minutesFormatted = `${minutes}m`;
    if (days < 0) return "-";
    return [daysFormatted, hoursFormatted, minutesFormatted].join("");
  }

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
          value={durationAsString(currentDate, slotStartTime)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="payHour"
          value={data?.hourlyPay}
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
          value={durationAsString(slotStartTime, slotEndTime)}
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
