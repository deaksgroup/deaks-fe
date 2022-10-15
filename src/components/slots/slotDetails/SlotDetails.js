import React from "react";
import { SlotContentWrapper } from "../../shared/components/SlotContentWrapper";
import { WorkersTable } from "./components/WorkersTable/WorkersTable";
import "./style/slotDetails.css";
export const SlotDetails = () => {
  const details = {
    id: "S3241",
    slot: "16th Jan Morning Shift : Ritz Carlton",
    outlet: "Banquet",
    hotel: "Ritz Carlton",
    slotTime: "10:00am - 5:00pm",
    slotDate: "10th Jan 2022",
  };
  return (
    <SlotContentWrapper {...details}>
      <div className="slotDetailsWrapper">
        <div className="workersTableView">
          <WorkersTable />
        </div>
      </div>
    </SlotContentWrapper>
  );
};
