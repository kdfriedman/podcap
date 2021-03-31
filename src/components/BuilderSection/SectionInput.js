import { useState, useContext } from "react";
import { Textarea } from "@chakra-ui/react";
import { BuilderContext } from "../../context/BuilderContext";

const SectionInput = (props) => {
  // destructure context, following useState format
  const [, updateBuilderSectionTextarea] = useContext(BuilderContext);
  // local state for binding textarea value to element's value attribute
  const [inputValue, updateInputValue] = useState("");

  const handleTextareaChange = (e) => {
    // retrieve parent element id to identify which text area has input
    if (!e.target.closest(`[id^='accordion-panel-']`)) return;
    // parse id # from parent element id string
    const parentElementId = e.target
      .closest(`[id^='accordion-panel-']`)
      .id.split("")
      .pop();

    // return all non textarea elements
    if (!e.target ?? !e.target.closest("textarea")) return;
    // update local state with textarea target value
    updateInputValue(e.target.value);

    // update context with new textarea value
    updateBuilderSectionTextarea((builderSectionTextareaList) => {
      // generate copy of builderSection list
      const copiedBuilderSectionTextareaList = [...builderSectionTextareaList];

      // check if parentElementId exists inside builderSection list
      const builderSectionTextareaIndex = copiedBuilderSectionTextareaList.findIndex(
        (prop) => {
          return prop.id === parentElementId;
        }
      );

      //if parentElementId has been added to builderSection list previously, update specific textarea value and id
      if (builderSectionTextareaIndex !== -1) {
        // update text with textarea active input, using index of previously saved data object
        copiedBuilderSectionTextareaList[builderSectionTextareaIndex].text =
          e.target.value;
        copiedBuilderSectionTextareaList[
          builderSectionTextareaIndex
        ].id = parentElementId;
        return copiedBuilderSectionTextareaList;
      }

      // generate new object to add to builderSection list, containing unique parentElId and textarea value
      return [
        ...builderSectionTextareaList,
        { id: parentElementId, text: e.target.value },
      ];
    });
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
