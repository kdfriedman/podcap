import React, { useState, useRef, useContext } from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import EditSectionTitle from "./EditSectionTitle";
import SectionTextarea from "./SectionTextarea";
import HideSection from "./HideSection";
import { DragHandleIcon } from "@chakra-ui/icons";
import { useDrag, useDrop } from "react-dnd";
import { BuilderContext } from "../../context/BuilderContext";

const DraggableAccordion = (props) => {
  // destructure context, following useState format
  const [builderSectionTextarea] = useContext(BuilderContext);
  // create duplicate local state to use for hiding accordions
  const [
    builderSectionVisibilityList,
    updateBuilderSectionVisibilityList,
  ] = useState([
    { id: "1", isVisible: true },
    { id: "2", isVisible: true },
    { id: "3", isVisible: true },
    { id: "4", isVisible: true },
  ]);

  // initialize media query hook from chakra, used for conditionally rendering content based on viewport width
  const [isLargerThan420] = useMediaQuery("(min-width: 420px)");

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

  // draggable libary config
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "accItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      props.moveAccordion(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "accItem",
    item: () => {
      return { id: props.id, index: props.index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <AccordionItem
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      key={`key${props.accItem.id}`}
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
          <HideSection
            updateBuilderSectionVisibilityList={
              updateBuilderSectionVisibilityList
            }
          />

          {/* initialize EditSectionTitle component to handle section title edits */}
          <EditSectionTitle
            updateAccItemList={props.updateAccItemList}
            accItem={props.accItem}
            isEditingSectionTitle={isEditingSectionTitle}
            updateIsEditingSectionTitle={updateIsEditingSectionTitle}
          />
          {/* if checkbox is selected, render hidden notice in accordion */}
          {!builderSectionVisibilityList[props.id - 1].isVisible && (
            <>
              {console.log(builderSectionVisibilityList[props.id - 1])}
              <Flex
                display={isLargerThan420 ? "flex" : "none"}
                margin="0 8px"
                padding="1px 0"
                maxWidth="5rem"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#D0D0D0"
                borderRadius="4px"
                flex="1"
              >
                <Text
                  fontSize="14px"
                  fontWeight="bold"
                  fontFamily="Inter, san-serif"
                  color="#616161"
                >
                  Hidden
                </Text>
              </Flex>
            </>
          )}
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
          <strong>Tip:</strong> Provide an overview describing the main episode
          highlights.
        </Text>
        {/* Instantiate SectionInput component - handles user input for rendering shownotes */}
        <SectionTextarea sectionId={props.id} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DraggableAccordion;
