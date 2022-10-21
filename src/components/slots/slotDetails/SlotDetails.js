import React from "react";
import { useParams } from "react-router-dom";
import { SlotContentWrapper } from "../../shared/components/SlotContentWrapper";
import { timeConv } from "../../shared/helper/util";
import { useSlotsQuery } from "../hooks/useSlots";
import { WorkersTable } from "./components/WorkersTable/WorkersTable";
import { SlotContextProvides } from "./SlotDetailsContext";
import "./style/slotDetails.css";
export const SlotDetails = () => {
  const { slotId } = useParams();
  const { data: slotInfos } = useSlotsQuery(slotId);
  const data = slotInfos?.[0];
  const details = {
    id: data?.id,
    slot: data?.shiftName,
    outlet: data?.outletDetails?.[0]?.outletName,
    hotel: data?.hotelDetails?.[0]?.hotelName,
    slotTime: `${timeConv(data?.startTime)} - ${timeConv(data?.endTime)}`,
    slotDate: data?.date,
    isActive: data?.isActive,
  };
  return (
    <SlotContextProvides>
      <SlotContentWrapper {...details}>
        <div className="slotDetailsWrapper">
          <div className="workersTableView">
            <WorkersTable />
          </div>
        </div>
      </SlotContentWrapper>
    </SlotContextProvides>
  );
};
