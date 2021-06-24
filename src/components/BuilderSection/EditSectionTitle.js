import { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Icon,
  Input,
  FormControl,
  useMediaQuery,
} from "@chakra-ui/react";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import isTouchDevice from "../../util/getDeviceType";

const EditSectionTitle = ({
  updateAccItemList,
  accItem,
  isEditingSectionTitle,
  updateIsEditingSectionTitle,
}) => {
  // initialize media query hook from chakra, used for conditionally rendering content based on viewport width
  const [isLargerThan420] = useMediaQuery("(min-width: 420px)");

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

    // only set draggable attribute back to true for non-touch devices
    if (!isTouchDevice()) {
      // set draggable container element back to true when section title input focus is lost and onblur event occurs
      const draggableContainer = e.target.closest("[data-handler-id]");
      if (!draggableContainer) return;
      draggableContainer.setAttribute("draggable", "true");
    }

    const targetEl = e.target.closest("[id^=sectionTitle]");
    const targetId = targetEl.id
      ? parseInt(targetEl.id.slice(targetEl.id.length - 1))
      : null;
    if (!targetEl || !targetId) return;

    // update save edit section state
    updateIsEditingSectionTitle((sectionTitleList) => {
      let copiedSectionTitleList = [...sectionTitleList];
      const targetIndex = copiedSectionTitleList.findIndex(
        (prop) => prop.id === targetId
      );
      copiedSectionTitleList[targetIndex].sectionTitle = false;
      return copiedSectionTitleList;
    });

    // store value of ref input to use later if user enters empty input and saves
    const sectionTitleCurrentValue =
      sectionTitleFormRef?.current?.elements[0]?.value;

    // check if section input is saved as empty input then update input value with prev stored value
    if (!sectionTitleCurrentValue) {
      // edit value of edit section input
      updateAccItemList((accItemList) => {
        let copiedAccItemList = [...accItemList];
        const targetIndex = copiedAccItemList.findIndex(
          (prop) => prop.id === targetId
        );
        copiedAccItemList[targetIndex].accItemTitleText = tempValue;
        return copiedAccItemList;
      });

      // check if element exists, otherwise return
      if (!document.querySelector("[data-is-editing]")) return;
      return document
        .querySelector("[data-is-editing]")
        .removeAttribute("data-is-editing");
    }
    updateTempValue(null);
    // check if element exists, otherwise return
    if (!document.querySelector("[data-is-editing]")) return;
    document
      .querySelector("[data-is-editing]")
      .removeAttribute("data-is-editing");
  };

  const handleInputFocus = (e) => {
    // check if device is non-touch and set attr to false to prevent dragging during editing
    if (!isTouchDevice()) {
      // remove draggable attribute to prevent accordion from dragging while editing section title input
      const draggableContainer = e.target.closest("[data-handler-id]");
      if (!draggableContainer) return;
      draggableContainer.setAttribute("draggable", "false");
    }
  };

  // prevent accordion from dragging on touch devices while editing section title
  const handleTouchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Box
      className="builder__section-title-container"
      flexDirection="row"
      display="flex"
      alignItems="center"
      color="#111"
      fontSize="17px"
      fontWeight="700"
      flex="1"
      textAlign="left"
      width="32px"
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
              {/* Max length char count of 45 characters */}
              <Input
                onTouchMove={handleTouchMove}
                onFocus={handleInputFocus}
                maxLength="45"
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
              {isLargerThan420 ? (
                "Save"
              ) : (
                <Flex justifyContent="center" alignItems="center">
                  <Icon
                    className="builder__section-title-save-icon"
                    as={FaSave}
                    color="#fff"
                    w="1.2rem"
                    h="1.2rem"
                  />
                </Flex>
              )}
            </Box>
          </form>
        </>
      ) : (
        <Box isTruncated className="builder__section-title-text">
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
          display={{ base: "flex", lg: "none" }}
          className="builder__section-title-edit-icon"
          ml=".6rem"
          as={MdModeEdit}
        />
      </Box>
    </Box>
  );
};
export default EditSectionTitle;
