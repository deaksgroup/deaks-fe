import React, { useState } from "react";

const ViewContext = React.createContext({
  viewState: "",

  content: {},
  handleAppView: (appView) => { },
  handleContent: (content) => { },
});

export const ViewContextProvider = (props) => {
  const [content, setContent] = useState({});
  const [view, setView] = useState("");

  const handleAppView = (appView) => {
    setView(appView);
  };
  const handleContent = (content) => {
    setContent(content);
  };

  return (
    <ViewContext.Provider
      value={{
        viewState: view,
        handleAppView: handleAppView,
        content: content,
        handleContent: handleContent,
      }}
    >
      {props.children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
