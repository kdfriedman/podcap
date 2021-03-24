import { useState } from "react";
import { Textarea } from "@chakra-ui/react";

const SectionInput = ({ sectionId }) => {
  const [inputValue, updateInputValue] = useState("");

  const handleTextareaChange = (e) => {
    if (!e.target ?? !e.target.closest("textarea")) return;
    updateInputValue(e.target.value);
  };

  const handleTextareaFocus = (e) => {
    // remove draggable attribute to prevent accordion from dragging while editing section title input
    const draggableContainer = e.target.closest("[data-handler-id]");
    if (!draggableContainer) return;
    draggableContainer.setAttribute("draggable", "false");
  };

  const handleTextareaBlur = (e) => {
    // remove draggable attribute to prevent accordion from dragging while editing section title input
    const draggableContainer = e.target.closest("[data-handler-id]");
    if (!draggableContainer) return;
    draggableContainer.setAttribute("draggable", "true");
  };

  return (
    <>
      {/* Textarea for accordion text input */}
      <Textarea
        placeholder="Enter show notes..."
        minH="180px"
        mt="8px"
        resize="none"
        pb={4}
        value={inputValue}
        onChange={handleTextareaChange}
        onFocus={handleTextareaFocus}
        onBlur={handleTextareaBlur}
      />
    </>
  );
};

export default SectionInput;
