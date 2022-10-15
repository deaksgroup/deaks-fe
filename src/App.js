import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./login";
import TermsConditions from "./components/leagal/TermsConditions";
import PrivacyPolicy from "./components/leagal/PrivacyPolicy";
import SupportChannel from "./components/leagal/SupportChannel";
import { LeftMenuBar } from "./components/navigation/LeftMenuBar ";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Users from "./components/users/Users";
import "./App.css";
import { Hotels } from "./components/hotels";
import { Outlet } from "./components/outlet";
import { Slots } from "./components/slots";
import { Groups } from "./components/groups";
import { AddNewSlots } from "./components/slots/components/AddNewSlots";
import { SlotDetails } from "./components/slots/slotDetails/SlotDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>

      <LeftMenuBar>
        <Routes>
          <Route path={"/"} element={<Navigate replace to="/login" />}></Route>
          <Route path={"/users"} element={<Users />} />
          <Route path={"/hotels"} element={<Hotels />} />
          <Route path={"/outlets"} element={<Outlet />} />
          <Route path={"/slots"} element={<Slots />} />
          <Route path="/addNewSlots" element={<AddNewSlots />}></Route>
          <Route path="/slot/details/:slotId" element={<SlotDetails />}></Route>
          <Route path={"/groups"} element={<Groups />} />
          <Route path={"/privacy-policy"} element={<PrivacyPolicy />}></Route>
          <Route
            path={"/terms-condition"}
            element={<TermsConditions />}
          ></Route>
          <Route path={"/support-channel"} element={<SupportChannel />}></Route>
        </Routes>
      </LeftMenuBar>
      <NotificationContainer />
    </div>
  );
}

export default App;
