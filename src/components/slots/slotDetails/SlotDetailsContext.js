import { createContext, useEffect, useState } from "react";

export const SlotDetailsContext = createContext();

export const SlotContextProvides = ({ children }) => {
  const [modalHeader, setModalHeader] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionApprover, setActionApprover] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [actionFunction, setActionFunction] = useState("");
  const value = {
    modalHeader,
    setModalHeader,
    dialogOpen,
    setDialogOpen,
    actionApprover,
    setActionApprover,
    dialogMessage,
    setDialogMessage,
    actionFunction,
    setActionFunction,
  };

  //Clearing the modal contents
  useEffect(() => {
    if (dialogOpen === false) {
      setActionApprover(false);
      setModalHeader("");
      setDialogMessage("");
      setActionFunction("");
    }
  }, [dialogOpen]);

  return (
    <SlotDetailsContext.Provider value={value}>
      {children}
    </SlotDetailsContext.Provider>
  );
};
