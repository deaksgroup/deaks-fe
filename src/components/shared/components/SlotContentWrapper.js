import { Avatar, Chip, Divider } from "@mui/material";
import React, { useContext } from "react";
import { RiHotelFill } from "react-icons/ri";
import { RiShoppingBasketFill, RiCalendar2Line } from "react-icons/ri";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

import "./styles/contentWrapper/style.css";
import { Stack } from "@mui/system";
import { SlotDetailsContext } from "../../slots/slotDetails/SlotDetailsContext";
import DeaksDialog from "./DeaksDialog";

export const SlotContentWrapper = (props) => {
  const { setDialogOpen, dialogOpen, dialogMessage, actionFunction } =
    useContext(SlotDetailsContext);
  const { id, slot, outlet, hotel, slotTime, slotDate, isActive } = props;
  return (
    <div className="headerBarWrapper">
      <div className="slotHeaderBar">
        <Stack direction={"row"} spacing={2} alignItems="center">
          <h3>{slot}</h3>
          <Chip
            label={isActive ? "Active" : "Cancelled"}
            variant="outlined"
            size="small"
            color={isActive ? "success" : "warning"}
          />
        </Stack>
        <div className="detailElements">
          <span>
            ID:{" "}
            <Chip
              avatar={
                <Avatar>
                  <RiHotelFill />
                </Avatar>
              }
              size="small"
              label={id}
            />
          </span>
          |
          <span>
            Hotel:{" "}
            <Chip
              avatar={
                <Avatar>
                  <RiHotelFill />
                </Avatar>
              }
              size="small"
              label={hotel}
            />
          </span>
          |
          <span>
            Outlet:{" "}
            <Chip
              avatar={
                <Avatar>
                  <RiShoppingBasketFill />
                </Avatar>
              }
              size="small"
              label={outlet}
            />{" "}
          </span>
          |
          <span>
            Date:
            <Chip
              avatar={
                <Avatar>
                  <RiCalendar2Line />
                </Avatar>
              }
              size="small"
              label={slotDate}
            />{" "}
          </span>
          |
          <span>
            Slot:{" "}
            <Chip
              avatar={
                <Avatar>
                  <WorkHistoryIcon size="small" sx={{ fontSize: "12px" }} />
                </Avatar>
              }
              size="small"
              label={slotTime}
            />{" "}
          </span>
        </div>
      </div>
      <div className="mainContents">{props.children}</div>
    </div>
  );
};
