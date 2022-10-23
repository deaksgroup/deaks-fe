import React, { useContext, useEffect } from "react";
import { SlotDetailsContext } from "../../SlotDetailsContext";
import { RightPanel } from "../RightPanel/RightPanel";
import { ConfirmedListTable } from "./ConfirmedListTable";
import { WaitingListTable } from "./WaitingListTable";

export const WorkersTable = () => {
  return (
    <div className="workersTablesWrapper">
      <ConfirmedListTable />
      <WaitingListTable />
      <RightPanel />
    </div>
  );
};
