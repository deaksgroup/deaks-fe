import React, { useState } from "react";
import { IconButton, Menu, MenuItem, TextField, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityPanel from "./VisibilityPanel";
import InfoPanel from "./InfoPanel";
import {
  useSlotCancelQuery,
  useSlotsQuery,
  useUpdateSlotData,
} from "../../../hooks/useSlots";
import { useParams } from "react-router-dom";
import DeaksDialog from "../../../../shared/components/DeaksDialog";
import StarIcon from "@mui/icons-material/Star";
import { NotificationManager } from "react-notifications";

function StatusPanel() {
  const { slotId } = useParams();
  const { data: slotInfos } = useSlotsQuery(slotId);
  const data = slotInfos?.[0];
  const { mutate: cancelSlotItem } = useSlotCancelQuery();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const open = Boolean(anchorEl);

  const { mutate: updateSotDetails } = useUpdateSlotData();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancelClick = () => {
    handleClose();
    setCancelModal(true);
  };
  const cancel = () => {
    cancelSlotItem(data?._id);
    setCancelModal(false);
  };
  const priorityTooltipMessage =
    data?.priority === "HIGH" ? "High priority job" : "Low priority job";
  const onChangePriorityHandler = async () => {
    const priority = data?.priority === "HIGH" ? "LOW" : "HIGH";
    try {
      const updatedSlotDataPayload = {
        requiredUpdate: "slot_priority",
        _id: slotId,
        priority: priority,
      };
      updateSotDetails(updatedSlotDataPayload);
    } catch (error) {
      NotificationManager.error("Priority update failed");
    }
  };

  return (
    <div className="statusPanelWrapper">
      <div className="headerCard">
        <div className="headerName">
          <p>About Slot</p>
          <Tooltip title={priorityTooltipMessage}>
            <div
              onClick={() => {
                onChangePriorityHandler();
              }}
            >
              {data?.priority === "HIGH" ? (
                <StarIcon className="priorityStar" />
              ) : (
                <StarIcon />
              )}
            </div>
          </Tooltip>
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
          value={data?.vacancy}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="Confirmed"
          value={data?.confirmedRequests?.length}
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
          value={data?.release}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          id="Waiting"
          value={data?.waitingRequests?.length}
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
          value={data?.vacancy - data?.confirmedRequests?.length}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="Priority"
          value={data?.priority}
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

      {/* Delete Dialog */}
      <DeaksDialog
        heading="Warning ..!"
        message={
          "The slot will get cancelled permanently, Do you wish ti continue?"
        }
        okButton="Yes"
        cancelButton="Cancel"
        deleteDialogOpen={cancelModal}
        setDeleteDialogOpen={setCancelModal}
        confirmFunction={cancel}
      />
      <Menu
        id="aboutMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          disabled={data?.isDeleted === false ? data?.isDeleted : true}
          size="small"
          onClick={handleCancelClick}
        >
          Cancel Slot
        </MenuItem>
      </Menu>
    </div>
  );
}

export default StatusPanel;
