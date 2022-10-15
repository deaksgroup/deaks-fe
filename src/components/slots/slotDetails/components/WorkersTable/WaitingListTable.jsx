import { Chip, IconButton, Menu, MenuItem, TableCell } from "@mui/material";
import React from "react";
import { DeaksTable } from "../../../../shared/components/DeaksTable";
import { TimeView } from "../../../../shared/helper/util";
import { StyledTableRow } from "../../../../users/utils/userUtils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { headings } from "../utils";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const WaitingListTable = () => {
  const options = ["None", "Atria", "Callisto", "Dione", "Ganymede"];
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [mainAnchorEl, setMainAnchorEl] = React.useState(null);
  const mainOpen = Boolean(mainAnchorEl);
  const handleMainClick = (event) => {
    setMainAnchorEl(event.currentTarget);
  };
  const handleMainClose = () => {
    setMainAnchorEl(null);
  };
  return (
    <div>
      <div className="tableName">
        <p>Waiting List</p> <span>|</span>
        <Chip
          icon={<AccountCircleIcon />}
          size="small"
          label="4"
          // color="secondary"
          variant="outlined"
        />
        <span>|</span>
        <IconButton
          aria-label="upload picture"
          component="label"
          id="basic-button"
          aria-controls={mainOpen ? "mainMenu" : undefined}
          aria-haspopup="true"
          aria-expanded={mainOpen ? "true" : undefined}
          onClick={handleMainClick}
        >
          <SettingsIcon size="small" className="menuIcon" />
        </IconButton>
        <Menu
          id="mainMenu"
          anchorEl={mainAnchorEl}
          open={mainOpen}
          onClose={handleMainClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleMainClose}>
            Override and move all to confirmed
          </MenuItem>
          <MenuItem onClick={handleMainClose}>Remove all users</MenuItem>
        </Menu>
      </div>
      <DeaksTable headings={headings} maxHeight={560}>
        <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
          <>
            <TableCell key={``} align="left">
              Karan
            </TableCell>
            <TableCell key={``} align="left">
              {TimeView("10: 30PM")}
              {/* <TimeView val="10: 30PM" /> */}
            </TableCell>

            <TableCell key={``} align="right">
              <IconButton
                size="small"
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon size="small" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </TableCell>
          </>
        </StyledTableRow>
        <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
          <>
            <TableCell key={``} align="left">
              Karan
            </TableCell>
            <TableCell key={``} align="left">
              {TimeView("10: 30PM")}
              {/* <TimeView val="10: 30PM" /> */}
            </TableCell>

            <TableCell key={``} align="right">
              <IconButton
                size="small"
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon size="small" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </TableCell>
          </>
        </StyledTableRow>
        <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
          <>
            <TableCell key={``} align="left">
              Karan
            </TableCell>
            <TableCell key={``} align="left">
              {TimeView("10: 30PM")}
              {/* <TimeView val="10: 30PM" /> */}
            </TableCell>

            <TableCell key={``} align="right">
              <IconButton
                size="small"
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon size="small" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </TableCell>
          </>
        </StyledTableRow>
        <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
          <>
            <TableCell key={``} align="left">
              Karan
            </TableCell>
            <TableCell key={``} align="left">
              {TimeView("10: 30PM")}
              {/* <TimeView val="10: 30PM" /> */}
            </TableCell>

            <TableCell key={``} align="right">
              <IconButton
                size="small"
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon size="small" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </TableCell>
          </>
        </StyledTableRow>
        <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
          <>
            <TableCell key={``} align="left">
              Karan
            </TableCell>
            <TableCell key={``} align="left">
              {TimeView("10: 30PM")}
              {/* <TimeView val="10: 30PM" /> */}
            </TableCell>

            <TableCell key={``} align="right">
              <IconButton
                size="small"
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon size="small" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </TableCell>
          </>
        </StyledTableRow>
        <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
          <>
            <TableCell key={``} align="left">
              Karan
            </TableCell>
            <TableCell key={``} align="left">
              {TimeView("10: 30PM")}
              {/* <TimeView val="10: 30PM" /> */}
            </TableCell>

            <TableCell key={``} align="right">
              <IconButton
                size="small"
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon size="small" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </TableCell>
          </>
        </StyledTableRow>
      </DeaksTable>
    </div>
  );
};
