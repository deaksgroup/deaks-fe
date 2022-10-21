import React, { useContext } from "react";
import { SlotDetailsContext } from "../../SlotDetailsContext";
import { RightPanel } from "../RightPanel/RightPanel";
import { ConfirmedListTable } from "./ConfirmedListTable";
import { WaitingListTable } from "./WaitingListTable";

export const WorkersTable = () => {
  const name = useContext(SlotDetailsContext);
  return (
    <div className="workersTablesWrapper">
      <ConfirmedListTable />
      <WaitingListTable />
      <RightPanel />
    </div>
  );
};
