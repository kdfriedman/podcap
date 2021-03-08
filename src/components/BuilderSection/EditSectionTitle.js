import { useState, useEffect, useRef } from "react";
import { Box, Icon, Input, FormControl } from "@chakra-ui/react";
import { MdModeEdit } from "react-icons/md";

const EditSectionTitle = ({
  updateAccItemList,
  accItem,
  isEditingSectionTitle,
  updateIsEditingSectionTitle,
}) => {
  const sectionTitleFormRef = useRef();
  const sectionTitleInputRef = useRef();

  const [tempValue, updateTempValue] = useState(null);

  // store value after user edits title as backup incase they enter empty input
  useEffect(() => {
    // check if there is an active edit icon section
    const isEditingSectionTitleId = isEditingSectionTitle.filter(
      (editingSectionTitle) => {
        return editingSectionTitle.sectionTitle;
      }
    );
    // must be at least 1 edit icon section active to proceed
    if (isEditingSectionTitleId.length > 0) {
      updateTempValue(sectionTitleInputRef?.current?.value);
    }
    // use isEditingSectionTitle as dependency which will only fire when a user edits a section
  }, [isEditingSectionTitle]);

  // handle edit title inside of accoridion section
  const handleEditTitle = (e) => {
    e.preventDefault();
    // section icon container element
    const targetIconContainerElement = e.target.closest(
      ".builder__section-title-edit-container"
    );
    // check if target icon container element exists
    if (!targetIconContainerElement) return;

    // generate numerical id from element target string id via slice
    const targetId = targetIconContainerElement.id
      ? parseInt(
          targetIconContainerElement.id.slice(
            targetIconContainerElement.id.length - 1
          )
        )
      : null;

    // update isEditingSectionTitle to conditionally render each editable section input
    updateIsEditingSectionTitle((sectionTitleList) => {
      let copiedSectionTitleList = [...sectionTitleList];
      // check if e.target.id is equal to current item in section title list
      const targetIndex = copiedSectionTitleList.findIndex((prop) => {
        return prop.id === targetId;
      });
      copiedSectionTitleList[targetIndex].sectionTitle = targetId;
      return copiedSectionTitleList;
    });

    // get target and wire up data attribute to hide edit icon
    const targetIconElement = e.target.closest(
      ".builder__section-title-edit-icon"
    );

    if (!targetIconElement) return;
    // add isEditing data attribute to signify the edit section title btn has been selected
    e.target.closest(
      ".builder__section-title-edit-icon"
    ).dataset.isEditing = true;
  };

  // update section title input value
  const handleInputChange = (e) => {
    e.preventDefault();
    if (!e.target ?? !e.target?.value) return;
    const targetId = e.target.id
      ? parseInt(e.target.id.slice(e.target.id.length - 1))
      : null;

    // edit value of edit section input
    updateAccItemList((accItemList) => {
      let copiedAccItemList = [...accItemList];
      const targetIndex = copiedAccItemList.findIndex(
        (prop) => prop.id === targetId
      );
      copiedAccItemList[targetIndex].accItemTitleText = e.target.value;
      return copiedAccItemList;
    });
  };

  // prevent accordion from opening when clicking into section title input
  const handleInputClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // handle save section title form submit
  const handleSectionTitleSave = (e) => {
    e.preventDefault();
    const targetId = e.target.id
      ? parseInt(e.target.id.slice(e.target.id.length - 1))
      : null;

    // update save edit section state
    updateIsEditingSectionTitle((sectionTitleList) => {
      let copiedSectionTitleList = [...sectionTitleList];
      const targetIndex = copiedSectionTitleList.findIndex(
        (prop) => prop.id === targetId
      );
      copiedSectionTitleList[targetIndex].sectionTitle = false;
      return copiedSectionTitleList;
    });
    // check if element exists, otherwise return
    if (!document.querySelector("[data-is-editing]")) return;
    document
      .querySelector("[data-is-editing]")
      .removeAttribute("data-is-editing");

    const sectionTitleCurrentValue =
      sectionTitleFormRef?.current?.elements[0]?.value;
    if (!sectionTitleCurrentValue) {
      // edit value of edit section input
      return updateAccItemList((accItemList) => {
        let copiedAccItemList = [...accItemList];
        const targetIndex = copiedAccItemList.findIndex(
          (prop) => prop.id === targetId
        );
        //TODO: figure out why some saves replace with prev value and some replace with empty string
        console.log(tempValue);
        copiedAccItemList[targetIndex].accItemTitleText = tempValue;
        return copiedAccItemList;
      });
    }
    updateTempValue(null);
  };

  return (
    <Box
      flexDirection="row"
      display="flex"
      alignItems="center"
      color="#111"
      fontSize="17px"
      fontWeight="700"
      flex="1"
      textAlign="left"
    >
      {isEditingSectionTitle[accItem.id - 1].sectionTitle ? (
        <>
          <form
            ref={sectionTitleFormRef}
            id={`sectionTitleForm${accItem.id}`}
            className="builder__section-title-form"
            onSubmit={handleSectionTitleSave}
          >
            <FormControl id={`sectionTitleControlInput${accItem.id}`}>
              <Input
                ref={sectionTitleInputRef}
                onBlur={handleSectionTitleSave}
                type="section-title"
                value={accItem.accItemTitleText}
                onChange={handleInputChange}
                onClick={handleInputClick}
                className="builder__section-title-input"
                _focus={{
                  border: "1px solid #773AE7",
                }}
              />
            </FormControl>
            <Box
              id={`sectionTitleSaveBtn${accItem.id}`}
              onClick={handleSectionTitleSave}
              type="submit"
              borderRadius="4px"
              backgroundColor="#000"
              fontSize="14px"
              fontWeight="600"
              color="#fff"
              padding="9px 14px"
              marginLeft="4px"
            >
              Save
            </Box>
          </form>
        </>
      ) : (
        <Box className="builder__section-title-text">
          {accItem.accItemTitleText}
        </Box>
      )}
      <Box
        id={`sectionTitleEditIconContainer${accItem.id}`}
        onClick={handleEditTitle}
        className="builder__section-title-edit-container"
        padding="1rem 1rem 1rem 0rem"
      >
        <Icon
          className="builder__section-title-edit-icon"
          display="none"
          ml=".6rem"
          as={MdModeEdit}
        />
      </Box>
    </Box>
  );
};
export default EditSectionTitle;
