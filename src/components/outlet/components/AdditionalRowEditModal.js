import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  addNewColumnItem,
  deleteExtraColumns,
  fetchExtraColumns,
  updateExtraColumns,
} from "../../shared/services/outletServices";
import { NotificationManager } from "react-notifications";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AdditionalRowEditModal = ({
  additionalColumnModalOpen,
  setAdditionalColumnModalOpen,
}) => {
  const [itemName, setItemName] = React.useState("");
  const [invoiceColumn, setInvoiceColumn] = React.useState([]);
  const [saveType, setSaveType] = React.useState("Add");
  const [updateId, setUpdateId] = React.useState("");

  const handleOpen = () => setAdditionalColumnModalOpen(true);
  const handleClose = () => setAdditionalColumnModalOpen(false);

  const getAllInvoiceColumns = React.useCallback(async () => {
    try {
      const columns = await fetchExtraColumns();
      if (columns?.data) {
        setInvoiceColumn(columns?.data);
      }
    } catch (error) {
      NotificationManager.error(error);
    }
  }, []);

  React.useEffect(() => {
    if (additionalColumnModalOpen) {
      getAllInvoiceColumns();
    }
  }, [getAllInvoiceColumns, additionalColumnModalOpen]);

  const saveColumnItem = async () => {
    if (itemName && itemName.length > 0) {
      try {
        await addNewColumnItem({ columnName: itemName });
        NotificationManager.success("Item added successfully");
        setItemName("");
        await getAllInvoiceColumns();
      } catch (error) {
        // NotificationManager.error(error);
      }
    }
  };

  const updateColumnItem = async () => {
    if (itemName.length > 0) {
      try {
        await updateExtraColumns({ id: updateId, columnName: itemName });
        NotificationManager.success("Item Updated successfully");
        setItemName("");
        await getAllInvoiceColumns();
        setSaveType("Add");
        setUpdateId("");
      } catch (error) {
        NotificationManager.error(error);
      }
    }
  };
  const deleteItem = async (id) => {
    try {
      await deleteExtraColumns(id);
      NotificationManager.success("Item Deleted successfully");
      setItemName("");
      await getAllInvoiceColumns();
      setSaveType("Add");
      setUpdateId("");
    } catch (error) {
      NotificationManager.error(error);
    }
  };

  const onEditHandler = (item) => {
    setUpdateId(item.id);
    setItemName(item?.name);
    setSaveType("Update");
  };

  const onCancelHandler = () => {
    setItemName("");
    setSaveType("Add");
    setUpdateId("");
  };

  return (
    <div>
      <Modal
        open={additionalColumnModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Additional Column Items
          </Typography>
          <div className="addNewWrapper">
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              label={
                saveType === "Add" ? "Add column item" : "Edit column item"
              }
              variant="outlined"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              value={itemName}
            />
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: "black" }}
              onClick={() => {
                if (saveType === "Add") {
                  saveColumnItem();
                } else {
                  updateColumnItem();
                }
              }}
            >
              {saveType}
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: "black" }}
              onClick={onCancelHandler}
            >
              Cancel
            </Button>
          </div>

          <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 250 }}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "white", background: "black" }}>
                    Column Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "white ", background: "black" }}
                    align="left"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ height: "100px", overflow: "scroll" }}>
                {invoiceColumn.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.columnName}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <IconButton
                          onClick={() => {
                            deleteItem(row._id);
                          }}
                          aria-label="delete"
                          size="small"
                        >
                          <DeleteOutlineOutlinedIcon size="small" />
                        </IconButton>
                        <IconButton
                          aria-label="Edit"
                          color="primary"
                          size="small"
                          onClick={() =>
                            onEditHandler({ id: row._id, name: row.columnName })
                          }
                        >
                          <ModeEditOutlineOutlinedIcon size="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};
