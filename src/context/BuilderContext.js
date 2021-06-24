import React, { useState, createContext } from "react";

export const BuilderContext = createContext();

export const BuilderProvider = (props) => {
  const [builderSectionTextarea, updateBuilderSectionTextarea] = useState([
    { id: "1", text: "", isVisible: true },
    { id: "2", text: "", isVisible: true },
    { id: "3", text: "", isVisible: true },
    { id: "4", text: "", isVisible: true },
  ]);
  return (
    <BuilderContext.Provider
      value={[builderSectionTextarea, updateBuilderSectionTextarea]}
    >
      {props.children}
    </BuilderContext.Provider>
  );
};
