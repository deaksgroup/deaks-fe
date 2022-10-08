import React from "react";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import { AttendanceList } from "./AttendanceList";

import "./style/attendenceStyle.css";

const Attendance = () => {
  return (
    <div>
      <ContentWrapper headerName="Users">
        <AttendanceList />
      </ContentWrapper>
    </div>
  );
};

export default Attendance;
