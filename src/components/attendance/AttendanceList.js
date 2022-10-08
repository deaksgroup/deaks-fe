import React from "react";
import { Chip, IconButton } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EditIcon from "@mui/icons-material/Edit";

const logo = require("../../assets/logo.jpg");

export const AttendanceList = () => {
  return (
    <div className="attendenceList">
      <div className="card">
        <div className="outletIdentity">
          <div className="hotelImg">
            <img src={logo} alt="hotel logo" />
            <p>feb 12</p>
          </div>
          <ul>
            <li>
              <h6>CARLTON.COLONY RESTAURANT </h6>
            </li>
            <li>
              <p className="secondary">#1234, Ritez Caltron</p>
            </li>
            <li>
              <Chip
                size="small"
                label="12:30pm - 9:30pm"
                icon={<AccessTimeFilledIcon />}
              />
            </li>
          </ul>
        </div>
        <div className="controls">
          <Chip
            size="small"
            label="Pending"
            icon={<EditIcon />}
            sx={{ background: "#c3af77", color: "white" }}
          />
          <div className="otherControls">
            <ul>
              <li>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <AttachMoneyIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <MailOutlineIcon fontSize="small" />
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="outletIdentity">
          <div className="hotelImg">
            <img src={logo} alt="hotel logo" />
            <p>feb 12</p>
          </div>
          <ul>
            <li>
              <h6>CARLTON.COLONY RESTAURANT </h6>
            </li>
            <li>
              <p className="secondary">#1234, Ritez Caltron</p>
            </li>
            <li>
              <Chip
                size="small"
                label="12:30pm - 9:30pm"
                icon={<AccessTimeFilledIcon />}
              />
            </li>
          </ul>
        </div>
        <div className="controls">
          <Chip
            size="small"
            label="Pending"
            icon={<EditIcon />}
            sx={{ background: "#c3af77", color: "white" }}
          />
          <div className="otherControls">
            <ul>
              <li>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <AttachMoneyIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <MailOutlineIcon fontSize="small" />
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="outletIdentity">
          <div className="hotelImg">
            <img src={logo} alt="hotel logo" />
            <p>feb 12</p>
          </div>
          <ul>
            <li>
              <h6>CARLTON.COLONY RESTAURANT </h6>
            </li>
            <li>
              <p className="secondary">#1234, Ritez Caltron</p>
            </li>
            <li>
              <Chip
                size="small"
                label="12:30pm - 9:30pm"
                icon={<AccessTimeFilledIcon />}
              />
            </li>
          </ul>
        </div>
        <div className="controls">
          <Chip
            size="small"
            label="Pending"
            icon={<EditIcon />}
            sx={{ background: "#c3af77", color: "white" }}
          />
          <div className="otherControls">
            <ul>
              <li>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <AttachMoneyIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <MailOutlineIcon fontSize="small" />
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="outletIdentity">
          <div className="hotelImg">
            <img src={logo} alt="hotel logo" />
            <p>feb 12</p>
          </div>
          <ul>
            <li>
              <h6>CARLTON.COLONY RESTAURANT </h6>
            </li>
            <li>
              <p className="secondary">#1234, Ritez Caltron</p>
            </li>
            <li>
              <Chip
                size="small"
                label="12:30pm - 9:30pm"
                icon={<AccessTimeFilledIcon />}
              />
            </li>
          </ul>
        </div>
        <div className="controls">
          <Chip
            size="small"
            label="Pending"
            icon={<EditIcon />}
            sx={{ background: "#c3af77", color: "white" }}
          />
          <div className="otherControls">
            <ul>
              <li>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <AttachMoneyIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ background: "#e8e8e8" }}>
                  <MailOutlineIcon fontSize="small" />
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
