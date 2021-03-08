import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  Textarea,
  Text,
} from "@chakra-ui/react";
import EditSectionTitle from "./EditSectionTitle";
import { DragHandleIcon } from "@chakra-ui/icons";

const AccordionModule = () => {
  // set state for section title input values with associated ids
  const [accItemList, updateAccItemList] = useState([
    { accItemTitleText: "Episode Summary", id: 1 },
    { accItemTitleText: "Guest Info", id: 2 },
    { accItemTitleText: "Referenced Media", id: 3 },
    { accItemTitleText: "Sponsored Links", id: 4 },
  ]);

  // set state for section edit title isEditing status with associated ids
  const [isEditingSectionTitle, updateIsEditingSectionTitle] = useState([
    { sectionTitle: false, id: 1 },
    { sectionTitle: false, id: 2 },
    { sectionTitle: false, id: 3 },
    { sectionTitle: false, id: 4 },
  ]);

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
            {/* Button which opens and closes accordion */}
            <AccordionButton
              onClick={handleSpaceBarEditSection}
              _hover={{
                background: "none",
              }}
              p="16px"
              maxH="56px"
            >
              {/* Drag icon to drag accordions items */}
              <DragHandleIcon
                marginRight="13px"
                marginLeft=" 4px"
                color="#888888"
                fontWeight="900"
              />
              {/* Checkbox to hide/show accordion items */}
              <Checkbox
                data-is-checkbox
                borderRadius="4px"
                colorScheme="brand"
                className="builder__section-checkbox"
                size="lg"
                mr="8px"
                defaultIsChecked
              />
              {/* initialize EditSectionTitle component to handle section title edits */}
              <EditSectionTitle
                updateAccItemList={updateAccItemList}
                accItem={accItem}
                isEditingSectionTitle={isEditingSectionTitle}
                updateIsEditingSectionTitle={updateIsEditingSectionTitle}
              />
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
            {/* Textarea for accordion text input */}
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
      {/* Render accordion list of sections */}
      {accItemList.length > 0 && renderAccoridions()}
    </Accordion>
  );
};

export default AccordionModule;
