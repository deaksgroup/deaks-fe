import { Avatar, Chip, Divider } from "@mui/material";
import React from "react";
import { RiHotelFill } from "react-icons/ri";
import { RiShoppingBasketFill, RiCalendar2Line } from "react-icons/ri";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

import "./styles/contentWrapper/style.css";

export const SlotContentWrapper = (props) => {
  const { id, slot, outlet, hotel, slotTime, slotDate } = props;
  return (
    <div className="headerBarWrapper">
      <div className="slotHeaderBar">
        <h3>{slot}</h3>
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
