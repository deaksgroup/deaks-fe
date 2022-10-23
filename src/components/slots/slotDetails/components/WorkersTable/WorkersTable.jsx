import React from "react";
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
