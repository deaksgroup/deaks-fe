import { Chip, TableCell } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { DeaksTable } from "../../shared/components/DeaksTable";
import { useNavigate } from "react-router-dom";
import { StyledIconButton, StyledTableRow } from "../../users/utils/userUtils";
import { headingSlots } from "../helpers/utils";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { timeConv } from "../../shared/helper/util";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ShieldIcon from "@mui/icons-material/Shield";
import LaunchIcon from "@mui/icons-material/Launch";

export const NewSlotsTable = ({
  tableValues,
  setEditFormData,
  setOpenNewSlotModal,
  setFormEditMode,
  setEditRowIndex,
  setTableValues,
  existList,
}) => {
  const navigate = useNavigate();
  // const deleteRowController = () => {};
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  return (
    <>
      <DeaksTable headings={headingSlots}>
        {existList?.map((item, index) => (
          <StyledTableRow hover role="table" tabIndex={-1} key={index}>
            <TableCell key={`idx${index}`} align="left">
              {item?.id}
            </TableCell>
            <TableCell key={`namex${index}`} align="left">
              {item?.shiftName || "-"}
            </TableCell>
            <TableCell key={`timex${index}`} align="left">
              <Chip
                size="small"
                color="primary"
                label={`${timeConv(item?.startTime)} - ${timeConv(
                  item?.endTime
                )}`}
              />
            </TableCell>
            <TableCell key={`pay${index}`} align="left">
              {"$" + item?.hourlyPay + " /hr" || "-"}
            </TableCell>
            <TableCell key={`vacc${index}`} align="left">
              {item?.vacancy || ""}
            </TableCell>
            <TableCell key={`released${index}`} align="left">
              {item?.release || ""}
            </TableCell>
            <TableCell key={`group${index}`} align="left">
              <Stack direction="row" spacing={1}>
                <Chip
                  size="small"
                  icon={<PublicOutlinedIcon />}
                  label={item?.selectedPrivetGroup?.length || 0}
                />
                <Chip
                  size="small"
                  icon={<ShieldIcon />}
                  label={item?.selectedPublicGroup?.length || 0}
                />
              </Stack>
            </TableCell>
            <TableCell key={`dedicated${index}`} align="left">
              {item?.selectedExclusiveUsers?.length}
            </TableCell>
            <TableCell key={`subs${index}`} align="left">
              {item?.subscribersView ? "Visible" : "Not Visible"}
            </TableCell>
            <TableCell key={`remark${index}`} align="left">
              -
            </TableCell>
            <TableCell key={`${item._id}`} align="left">
              <>
                <StyledIconButton
                  size="small"
                  aria-label="delete Hotel"
                  onClick={() => {
                    navigate(`/slot/details/${item._id}`);
                  }}
                >
                  <LaunchIcon size="small" />
                </StyledIconButton>
              </>
            </TableCell>
          </StyledTableRow>
        ))}

        {tableValues.map((item, index) => {
          return (
            <StyledTableRow hover role="table" tabIndex={-1} key={index}>
              <>
                <TableCell key={`id${index}`} align="left">
                  -
                </TableCell>
                <TableCell key={`name${index}`} align="left">
                  {item?.shiftName || "-"}
                </TableCell>
                <TableCell key={`time${index}`} align="left">
                  <Chip
                    size="small"
                    color="primary"
                    label={`${timeConv(item?.startTime)} - ${timeConv(
                      item?.endTime
                    )}`}
                  />
                </TableCell>
                <TableCell key={`pay${index}`} align="left">
                  {"$" + item?.hourlyPay + " /hr" || "-"}
                </TableCell>
                <TableCell key={`vacc${index}`} align="left">
                  {item?.vacancy || ""}
                </TableCell>
                <TableCell key={`released${index}`} align="left">
                  {item?.release || ""}
                </TableCell>
                <TableCell key={`group${index}`} align="left">
                  <Stack direction="row" spacing={1}>
                    <Chip
                      size="small"
                      icon={<PublicOutlinedIcon />}
                      label={item?.selectedPrivetGroup?.length || 0}
                    />
                    <Chip
                      size="small"
                      icon={<ShieldIcon />}
                      label={item?.selectedPublicGroup?.length || 0}
                    />
                  </Stack>
                </TableCell>
                <TableCell key={`dedicated${index}`} align="left">
                  {item?.selectedExclusiveUsers?.length}
                </TableCell>
                <TableCell key={`subs${index}`} align="left">
                  {item?.subscribersView ? "Visible" : "Not Visible"}
                </TableCell>
                <TableCell key={`remark${index}`} align="left">
                  -
                </TableCell>
                <TableCell key={`${item._id}`} align="left">
                  <Stack direction="row" spacing={1}>
                    <StyledIconButton
                      size="small"
                      aria-label="delete Hotel"
                      onClick={() => {}}
                    >
                      <DeleteOutlinedIcon size="small" />
                    </StyledIconButton>
                    <StyledIconButton
                      size="small"
                      aria-label="Edit User"
                      onClick={() => {
                        setEditFormData(tableValues[index]);
                        setOpenNewSlotModal(true);
                        setFormEditMode(true);
                        setEditRowIndex(index);
                      }}
                    >
                      <ModeEditOutlineOutlinedIcon size="small" />
                    </StyledIconButton>
                  </Stack>
                </TableCell>
              </>
            </StyledTableRow>
          );
        })}
      </DeaksTable>
    </>
  );
};
