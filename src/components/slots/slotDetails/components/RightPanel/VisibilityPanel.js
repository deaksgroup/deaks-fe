import { Avatar, Chip, FormControlLabel, Switch, Tooltip } from "@mui/material";
import React from "react";
import PublicIcon from "@mui/icons-material/Public";
import ShieldIcon from "@mui/icons-material/Shield";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useSlotsQuery } from "../../../hooks/useSlots";
import { useParams } from "react-router-dom";

const VisibilityPanel = () => {
  const { slotId } = useParams();
  const { data } = useSlotsQuery(slotId);
  return (
    <div>
      <div className="headerVisibility">
        <FormControlLabel
          value="true"
          control={
            <Switch color="primary" defaultChecked={data?.subscribersView} />
          }
          label={
            <p style={{ marginLeft: 16, marginBottom: 0 }}>Dedicated Filter</p>
          }
          labelPlacement="start"
        />
      </div>
      <div className="visibilityWrapper">
        <Tooltip title="Public Group View">
          <Chip
            variant="outlined"
            avatar={
              <Avatar>
                <PublicIcon />
              </Avatar>
            }
            label={data?.selectedPublicGroup?.length}
          />
        </Tooltip>

        <Tooltip title="Private Group View">
          <Chip
            variant="outlined"
            avatar={
              <Avatar>
                <ShieldIcon size="small" />
              </Avatar>
            }
            label={data?.selectedPrivateGroup?.length}
          />
        </Tooltip>

        <Tooltip title="Exclusive Users View">
          <Chip
            variant="outlined"
            avatar={
              <Avatar>
                <GroupIcon size="small" />
              </Avatar>
            }
            label={data?.selectedExclusiveUsers?.length}
          />
        </Tooltip>

        <Tooltip title="Subscriber View">
          <Chip
            variant="outlined"
            avatar={
              <Avatar>
                <NotificationsActiveIcon size="small" />
              </Avatar>
            }
            label={data?.subscribersView === true ? "On" : "Off"}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default VisibilityPanel;
