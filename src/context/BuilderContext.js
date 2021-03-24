import React, { useState, createContext } from "react";

export const BuilderContext = createContext();

export const BuilderProvider = (props) => {
  const [builderSectionTextarea, updateBuilderSectionTextarea] = useState([]);
  return (
    <BuilderContext.Provider
      value={[builderSectionTextarea, updateBuilderSectionTextarea]}
    >
      {props.children}
    </BuilderContext.Provider>
  );
};
