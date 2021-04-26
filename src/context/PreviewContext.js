import React, { useState, createContext } from "react";

export const PreviewContext = createContext();

export const PreviewProvider = (props) => {
  // set state for image file
  const [currentImage, setImage] = useState(null);
  // set state for image base64 string to pass in as src of <img> tag
  const [fileToBase64, updateBase64] = useState(null);
  // set state for text inputs in form
  const [formInputText, updateFormInputText] = useState([]);

  return (
    <PreviewContext.Provider
      value={[
        currentImage,
        setImage,
        fileToBase64,
        updateBase64,
        formInputText,
        updateFormInputText,
      ]}
    >
      {props.children}
    </PreviewContext.Provider>
  );
};
