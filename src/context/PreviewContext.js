import React, { useState, createContext, useMemo } from "react";

export const PreviewContext = createContext();

export const PreviewProvider = (props) => {
  // set state for image file
  const [currentImage, setImage] = useState(null);
  // set state for image base64 string to pass in as src of <img> tag
  const [fileToBase64, updateBase64] = useState(null);

  // set state for form submit amount to determine if component should auto render saved image
  const [podcastInfoSubmitCount, setPodcastInfoSubmitCount] = useState(0);

  // set state for text inputs in form
  const [formInputText, updateFormInputText] = useState([
    { id: "podcastNameInput", text: "" },
    { id: "podcastTitleInput", text: "" },
  ]);

  const providerValue = useMemo(
    () => ({
      currentImage,
      setImage,
      fileToBase64,
      updateBase64,
      formInputText,
      updateFormInputText,
      podcastInfoSubmitCount,
      setPodcastInfoSubmitCount,
    }),
    [currentImage, fileToBase64, podcastInfoSubmitCount, formInputText]
  );

  return (
    <PreviewContext.Provider value={providerValue}>
      {props.children}
    </PreviewContext.Provider>
  );
};
