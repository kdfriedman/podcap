import { useState, useCallback } from "react";
import { Accordion } from "@chakra-ui/react";
import update from "immutability-helper";
import RearrangeSection from "./RearrangeSection";

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

  // allows us to update the state as an entire object and alter order of each item in the arr
  const moveAccordion = useCallback(
    (dragIndex, hoverIndex) => {
      const dragAccordion = accItemList[dragIndex];
      updateAccItemList(
        // special package from immutability-helper
        update(accItemList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragAccordion],
          ],
        })
      );
    },
    [accItemList]
  );
  const renderDraggableAccoridions = (accItem, index) => {
    return (
      <RearrangeSection
        key={accItem.id}
        index={index}
        id={accItem.id}
        accItemTitleText={accItem.accItemTitleText}
        moveAccordion={moveAccordion}
        isEditingSectionTitle={isEditingSectionTitle}
        updateIsEditingSectionTitle={updateIsEditingSectionTitle}
        updateAccItemList={updateAccItemList}
        handleSpaceBarEditSection={handleSpaceBarEditSection}
        accItem={accItem}
      />
    );
  };

  // bootstrap accordiion items as JXS
  const renderAccoridions = () => {
    // map through accordion item data and render
    return accItemList.map((accItem, i) => {
      return renderDraggableAccoridions(accItem, i);
    });
  };

  return (
    <>
      {/* // Accordion parent container */}
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
    </>
  );
};

export default AccordionModule;
