import React from "react";
import { useParams } from "react-router-dom";
import { SlotContentWrapper } from "../../shared/components/SlotContentWrapper";
import { timeConv } from "../../shared/helper/util";
import { useSlotsQuery } from "../hooks/useSlots";
import { WorkersTable } from "./components/WorkersTable/WorkersTable";
import "./style/slotDetails.css";
export const SlotDetails = () => {
  const { slotId } = useParams();
  const { data } = useSlotsQuery(slotId);
  const details = {
    id: data?.id,
    slot: data?.shiftName,
    outlet: "Banquet",
    hotel: "Ritz Carlton",
    slotTime: `${timeConv(data?.startTime)} - ${timeConv(data?.endTime)}`,
    slotDate: data?.date,
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
