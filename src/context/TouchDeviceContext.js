import React, { useState, createContext } from "react";

export const TouchDeviceContext = createContext();

export const TouchDeviceProvider = (props) => {
  const [
    touchDeviceSectionVisibilityList,
    updateTouchDeviceSectionVisibilityList,
  ] = useState([
    { id: "builderSection", isSectionVisible: true },
    { id: "previewSection", isSectionVisible: false },
  ]);
  return (
    <TouchDeviceContext.Provider
      value={[
        touchDeviceSectionVisibilityList,
        updateTouchDeviceSectionVisibilityList,
      ]}
    >
      {props.children}
    </TouchDeviceContext.Provider>
  );
};
