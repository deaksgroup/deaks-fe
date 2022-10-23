import React from "react";
import {
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  Tooltip,
} from "@mui/material";
import { DeaksTable } from "../../../../shared/components/DeaksTable";
import { StyledTableRow } from "../../../../users/utils/userUtils";
import { headings } from "../utils";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  useMoveSlotUser,
  useRemoveWaitingListUser,
  useSlotsQuery,
} from "../../../hooks/useSlots";
import { useParams } from "react-router-dom";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { CgMoveLeft } from "react-icons/cg";

export const WaitingListTable = () => {
  const { slotId } = useParams();
  const [mainAnchorEl, setMainAnchorEl] = React.useState(null);
  const mainOpen = Boolean(mainAnchorEl);

  // Query
  const { mutate: MoveUserToConfirmed } = useMoveSlotUser();
  const { mutate: RemoveUserFromWaitingList } = useRemoveWaitingListUser();
  const { data: slotInfos } = useSlotsQuery(slotId);
  const data = slotInfos?.[0];

  // Handlers
  const handleMoveUserToConfirmed = (userId) => {
    const override = data?.confirmedRequests?.length >= data.vacancy;
    MoveUserToConfirmed({ slotId, userId, override });
  };

  const handleRemoveWaitingListUser = (userId) =>
    RemoveUserFromWaitingList({ slotId, userId });

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
          label={data?.waitingRequests?.length}
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
        {data?.waitingRequests?.map((item) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={""}>
              <>
                <TableCell key={``} align="left">
                  {item?.name}
                </TableCell>
                <TableCell key={``} align="left">
                  {item?.status?.length > 0 ? item?.status : "-"}
                  {/* <TimeView val="10: 30PM" /> */}
                </TableCell>

                <TableCell key={``} align="right">
                  <Tooltip title="Remove user">
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleRemoveWaitingListUser(item._id);
                      }}
                    >
                      <PersonRemoveIcon size="small" className="menuIcon" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Move to confirmed list">
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleMoveUserToConfirmed(item._id);
                      }}
                    >
                      <CgMoveLeft sx={{ fontSize: "60px" }} />
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
