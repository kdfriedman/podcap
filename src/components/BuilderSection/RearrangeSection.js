import { useRef } from "react";
import {
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
import { useDrag, useDrop } from "react-dnd";

const RearrangeSection = (props) => {
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

  // const handleDragStart = (e) => {
  //   const draggableAccItem = e.target.closest("[data-handler-id]");
  //   if (!draggableAccItem) return;

  //   const sectionTitleForm = draggableAccItem.querySelector("form");
  //   if (sectionTitleForm) {
  //     e.preventDefault();
  //   }
  // };

  return (
    <AccordionItem
      //onDragStart={handleDragStart}
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
          onClick={props.handleSpaceBarEditSection}
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
            updateAccItemList={props.updateAccItemList}
            accItem={props.accItem}
            isEditingSectionTitle={props.isEditingSectionTitle}
            updateIsEditingSectionTitle={props.updateIsEditingSectionTitle}
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
          <strong>Tip:</strong> Provide an overview describing the main episode
          highlights.
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
};

export default RearrangeSection;
