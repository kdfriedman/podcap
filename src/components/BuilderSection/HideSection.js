import { useContext } from "react";
import { Checkbox } from "@chakra-ui/react";
import { BuilderContext } from "../../context/BuilderContext";

const HideSection = () => {
  // destructure context, following useState format
  const [, updateBuilderSectionTextarea] = useContext(BuilderContext);

  // hide preview section input when checkbox is selected
  const handleCheckboxChange = (e) => {
    // retrieve parent element id to identify which text area has input
    if (!e.target.closest(`[id^='accordion-button-']`)) return;
    // parse id # from parent element id string
    const parentElementId = e.target
      .closest(`[id^='accordion-button-']`)
      .id.split("")
      .pop();

    const isCheckbox = e.target.type === "checkbox";
    if (!isCheckbox) return;

    updateBuilderSectionTextarea((builderSectionTextarea) => {
      const copiedBuilderSectionTextarea = [...builderSectionTextarea];
      const selectedSectionCheckBox = copiedBuilderSectionTextarea.findIndex(
        (section) => section.id === parentElementId
      );
      copiedBuilderSectionTextarea[selectedSectionCheckBox].isVisible =
        e.target.checked;
      return copiedBuilderSectionTextarea;
    });
  };

  return (
    <>
      <Checkbox
        onChange={handleCheckboxChange}
        data-is-checkbox
        borderRadius="4px"
        colorScheme="brand"
        className="builder__section-checkbox"
        size="lg"
        mr="8px"
        defaultIsChecked
      />
    </>
  );
};

export default HideSection;
