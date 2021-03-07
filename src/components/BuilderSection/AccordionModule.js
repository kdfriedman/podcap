import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
  Textarea,
  Text,
  Icon,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { MdModeEdit } from "react-icons/md";

const AccordionModule = () => {
  // set section title input value
  const [accItemList, updateAccItemList] = useState([
    { accItemTitleText: "Episode Summary", id: 1 },
    { accItemTitleText: "Guest Info", id: 2 },
    { accItemTitleText: "Referenced Media", id: 3 },
    { accItemTitleText: "Sponsored Links", id: 4 },
  ]);

  // set default state for builder section title editer
  const [isEditingSectionTitle, updateIsEditingSectionTitle] = useState([
    { sectionTitle: false, id: 1 },
    { sectionTitle: false, id: 2 },
    { sectionTitle: false, id: 3 },
    { sectionTitle: false, id: 4 },
  ]);

  // handle edit title inside of accoridion section
  const handleEditTitle = (e) => {
    e.preventDefault();
    const targetIconContainerElement = e.target.closest(
      ".builder__section-title-edit-container"
    );
    // check if target icon container element exists
    if (!targetIconContainerElement) return;

    // update edit section title state as active (true)
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
  };

  // handle Accordion button space bar while editing input is active
  const handleSpaceBarEditSection = (e) => {
    const isEditingStatusList = isEditingSectionTitle.filter((editSection) => {
      return editSection.sectionTitle;
    });
    if (isEditingStatusList.length > 0) {
      e.preventDefault();
    }
  };

  // bootstrap accordiion items as JXS
  const renderAccoridions = () => {
    // map through accordion item data and render
    return accItemList.map((accItem) => {
      return (
        <AccordionItem
          key={`key${accItem.id}`}
          className="builder__accordion-item"
          w="100%"
        >
          <h2>
            <AccordionButton
              onClick={handleSpaceBarEditSection}
              _hover={{
                background: "none",
              }}
              p="16px"
              maxH="56px"
            >
              <DragHandleIcon
                marginRight="13px"
                marginLeft=" 4px"
                color="#888888"
                fontWeight="900"
              />
              <Checkbox
                data-is-checkbox
                borderRadius="4px"
                colorScheme="brand"
                className="builder__section-checkbox"
                size="lg"
                mr="8px"
                defaultIsChecked
              />
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
                      id={`sectionTitleForm${accItem.id}`}
                      className="builder__section-title-form"
                      onSubmit={handleSectionTitleSave}
                    >
                      <FormControl id={`sectionTitleControlInput${accItem.id}`}>
                        <Input
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
                    {accItem.accItemTitleText ?? `Example Summary`}
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
              <AccordionIcon w="2rem" h="2rem," />
            </AccordionButton>
          </h2>
          <AccordionPanel pt="0" pb={4}>
            <Text
              color="#666"
              fontSize="14px"
              lineHeight="1.3em"
              className="builder__accordion-tip-text"
            >
              <strong>Tip:</strong> Provide an overview describing the main
              episode highlights.
            </Text>
            <Textarea
              placeholder="Enter show notes..."
              minH="180px"
              mt="8px"
              resize="none"
              pb={4}
            />
          </AccordionPanel>
        </AccordionItem>
      );
    });
  };

  return (
    // Accordion parent container
    <Accordion
      className="builder__accordion-container"
      backgroundColor="white"
      m="16px 24px"
      borderRadius="6px"
      w="100%"
      h="fit-content"
      boxShadow="0 2px 6px 0 rgb(0 0 0 / 20%)"
      defaultIndex={[0]}
      allowMultiple
    >
      {/* Redner accordion list of sections */}
      {accItemList.length > 0 && renderAccoridions()}
    </Accordion>
  );
};

export default AccordionModule;
