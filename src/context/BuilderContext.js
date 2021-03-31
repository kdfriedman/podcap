import React, { useState, createContext } from "react";

export const BuilderContext = createContext();

export const BuilderProvider = (props) => {
  const [builderSectionTextarea, updateBuilderSectionTextarea] = useState([
    { id: "1", text: "" },
    { id: "2", text: "" },
    { id: "3", text: "" },
    { id: "4", text: "" },
  ]);
  return (
    <BuilderContext.Provider
      value={[builderSectionTextarea, updateBuilderSectionTextarea]}
    >
      {props.children}
    </BuilderContext.Provider>
  );
};
