import React from "react";
import "./styles/contentWrapper/style.css";

export const ContentWrapper = (props) => {
  return (
    <div className="headerBarWrapper">
      <div className="headerBar">
        <h3>{props.headerName}</h3>
      </div>
      <div className="mainContents">{props.children}</div>
    </div>
  );
};
