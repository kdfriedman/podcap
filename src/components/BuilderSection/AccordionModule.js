import React, { useState, useCallback, useContext } from "react";
import { Accordion } from "@chakra-ui/react";
import update from "immutability-helper";
import DraggableAccordion from "./DraggableAccordion";
import { BuilderContext } from "../../context/BuilderContext";

const AccordionModule = () => {
  // get context updater function to keep track of global state
  const [, updateBuilderSectionTextarea] = useContext(BuilderContext);

  // set state for section title input values with associated ids
  const [accItemList, updateAccItemList] = useState([
    { accItemTitleText: "Episode Summary", id: 1 },
    { accItemTitleText: "Guest Info", id: 2 },
    { accItemTitleText: "Referenced Media", id: 3 },
    { accItemTitleText: "Sponsored Links", id: 4 },
  ]);

  //TODO: figure out how to sort ids of updated/mutated accItemList
  // allows us to update the state as an entire object and alter order of each item in the arr
  const moveAccordion = useCallback(
    (dragIndex, hoverIndex) => {
      const dragAccordion = accItemList[dragIndex];
      let mutatedAccItemList;

      updateAccItemList((accItemList) => {
        // special package from immutability-helper
        // uses drag index to remove the item from the accItemList array,
        // then uses the hover index to figure out where to add the removed item back into the accItem array at the new index
        mutatedAccItemList = update(accItemList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragAccordion],
          ],
        });
        return mutatedAccItemList;
      });

      updateBuilderSectionTextarea((builderSectionTextareaList) => {
        // get correlated matching textarea from draggable accordion by index
        const draggedBuilderSection = builderSectionTextareaList[dragIndex];
        // update textarea position onDrag, which correlates to accordion which has been dragged to a new index
        const mutatedBuilderSectionTextareaList = update(
          builderSectionTextareaList,
          {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, draggedBuilderSection],
            ],
          }
        );
        return mutatedBuilderSectionTextareaList;
      });
    },
    [accItemList, updateBuilderSectionTextarea]
  );

  // handler to render draggable accordion section which returns jsx
  const renderDraggableAccoridions = (accItem, index) => {
    return (
      <DraggableAccordion
        key={accItem.id}
        index={index}
        id={accItem.id}
        accItemTitleText={accItem.accItemTitleText}
        moveAccordion={moveAccordion}
        updateAccItemList={updateAccItemList}
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
        m={{
          base: "1.75rem",
          md: "16px 24px",
        }}
        borderRadius="6px"
        w="100%"
        h="fit-content"
        boxShadow="0 2px 6px 0 rgb(0 0 0 / 20%)"
        defaultIndex={[0]}
      >
        {/* Render accordion list of sections */}
        {accItemList.length > 0 && renderAccoridions()}
      </Accordion>
    </>
  );
};

export default AccordionModule;
