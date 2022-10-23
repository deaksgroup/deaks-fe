import { Chip, IconButton, TableCell, Tooltip } from "@mui/material";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DeaksTable } from "../../../../shared/components/DeaksTable";
import { StyledTableRow } from "../../../../users/utils/userUtils";
import { headings } from "../utils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useParams } from "react-router-dom";
import {
  useMoveAllUsersToWaiting,
  useMoveSlotUserToWaitingList,
  useRemoveConfirmedUser,
  useSlotsQuery,
} from "../../../hooks/useSlots";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { CgMoveRight } from "react-icons/cg";

export const ConfirmedListTable = () => {
  const { slotId } = useParams();

  const [mainAnchorEl, setMainAnchorEl] = React.useState(null);
  const mainOpen = Boolean(mainAnchorEl);

  // Query
  const { mutate: MoveUserToWaitingLists } = useMoveSlotUserToWaitingList();
  const { mutate: RemoveConfirmedUser } = useRemoveConfirmedUser();
  const { mutate: moveAllUsersToWaitingList } = useMoveAllUsersToWaiting();
  const { data: slotInfos } = useSlotsQuery(slotId);
  const data = slotInfos?.[0];

  const handleMoveUserToWaiting = (userId) =>
    MoveUserToWaitingLists({ slotId, userId });
  const handleRemoveConfirmedUser = (userId) =>
    RemoveConfirmedUser({ slotId, userId });
  const handleMainClick = (event) => {
    setMainAnchorEl(event.currentTarget);
  };

  const handleMainClose = () => {
    setMainAnchorEl(null);
  };

  const handleMoveAllToWaiting = () => {
    handleMainClose();
    moveAllUsersToWaitingList(slotId);
  };

  return (
    <div>
      <div className="tableName">
        <p>Confirmed Users</p> <span>|</span>
        <Chip
          icon={<AccountCircleIcon />}
          size="small"
          label={
            <p>
              {data?.confirmedRequests?.length} / <b>{data?.release}</b>
            </p>
          }
          // color="primary"
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
          <MenuItem
            onClick={() => {
              handleMoveAllToWaiting();
            }}
          >
            Move all users to waiting list
          </MenuItem>
          <MenuItem onClick={handleMainClose}>Remove all users</MenuItem>
        </Menu>
      </div>
      <DeaksTable headings={headings} maxHeight={560}>
        {data?.confirmedRequests.map((item) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
              <>
                <TableCell key={``} align="left">
                  {item?.name}
                </TableCell>
                <TableCell key={``} align="left">
                  {item?.status.length > 0 ? item?.status : "-"}
                  {/* <TimeView val="10: 30PM" /> */}
                </TableCell>

                <TableCell key={``} align="right">
                  <Tooltip title="Remove user">
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleRemoveConfirmedUser(item._id);
                      }}
                    >
                      <PersonRemoveIcon size="small" className="menuIcon" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Move user to waiting list">
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleMoveUserToWaiting(item._id);
                      }}
                    >
                      <CgMoveRight sx={{ fontSize: "60px" }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </>
            </StyledTableRow>
          );
        })}
      </DeaksTable>
    </div>
  );
};
