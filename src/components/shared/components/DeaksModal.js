import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

export const DeaksModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    overFlow: "scroll",
    transform: "translate(-50%, -50%)",
    width: props.modalWidth,
    height: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const open = props.modalOpen;
  const handleClose = () => props.setModalOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h4"
              component="h1"
              fontWeight={700}
            >
              {props.modalHeader}
            </Typography>
            <div className="modalContent">{props.children}</div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
