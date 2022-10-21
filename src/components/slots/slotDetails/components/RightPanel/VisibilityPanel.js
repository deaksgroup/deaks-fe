import {
  Autocomplete,
  Avatar,
  Chip,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import ShieldIcon from "@mui/icons-material/Shield";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useDedicatedFilter, useSlotsQuery } from "../../../hooks/useSlots";
import { useParams } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DeaksModal } from "../../../../shared/components/DeaksModal";
import { NewSlotModal } from "../../../components/NewSlotModal";
import { DetailSlotEditModal } from "../../../components/DetailSlotEditModal";

const VisibilityPanel = () => {
  const { slotId } = useParams();
  const [editUserGroupModal, setEditUserGroupModal] = useState(false);
  const [tableValues, setTableValues] = useState([]);
  const [editFormData, setEditFormData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState([]);

  // Query
  const { mutate: editDedicatedView } = useDedicatedFilter();
  const { data: slotInfos } = useSlotsQuery(slotId);
  const data = slotInfos?.[0];

  // Fn
  const dedicatedFilterHandler = (bool) => {
    editDedicatedView({ bool, slotId });
  };

  // Handles
  const handleEditGroupModalOpen = () => {
    setEditUserGroupModal(true);
  };

  return (
    <div>
      <div className="headerVisibility">
        <FormControlLabel
          onClick={() => {
            dedicatedFilterHandler(!data?.dedicatedFilter);
          }}
          value="true"
          control={<Switch color="primary" checked={data?.dedicatedFilter} />}
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
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={() => {
            handleEditGroupModalOpen();
          }}
        >
          <EditOutlinedIcon size="small" sx={{ color: "gray" }} />
        </IconButton>
      </div>
      <DetailSlotEditModal
        open={editUserGroupModal}
        setOpen={setEditUserGroupModal}
        hotel={data?.hotelDetails}
        tableValues={tableValues}
        setTableValues={setTableValues}
        editFormData={data}
        setEditFormData={setEditFormData}
        setFormEditMode={() => {}}
        formEditMode={true}
        setEditRowIndex={setEditRowIndex}
        editRowIndex={editRowIndex}
      />
    </div>
  );
};

export default VisibilityPanel;
