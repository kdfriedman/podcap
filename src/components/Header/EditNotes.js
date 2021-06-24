import { useContext } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { TouchDeviceContext } from "../../context/TouchDeviceContext";

const EditNotes = () => {
  // get touch device context updater function to change visible state of sections
  const [, updateTouchDeviceSectionVisibilityList] = useContext(
    TouchDeviceContext
  );

  const renderBuilderShowNotes = (e) => {
    updateTouchDeviceSectionVisibilityList((touchDeviceSectionList) => {
      const copiedTouchDeviceSectionList = [...touchDeviceSectionList];
      // reverse visiblity state for each section and return copied list
      for (const touchDeviceSection of copiedTouchDeviceSectionList) {
        touchDeviceSection.isSectionVisible = !touchDeviceSection.isSectionVisible;
      }
      return copiedTouchDeviceSectionList;
    });
  };

  return (
    <>
      <Flex
        display={{ base: "flex", lg: "none" }}
        className="nav__copy-shownotes-btn"
        backgroundColor="#fff"
      >
        <Button
          onClick={renderBuilderShowNotes}
          id="EditNotesBtn"
          _hover={{
            opacity: ".8",
          }}
          _active={{
            background: "none",
          }}
          justifyContent="flex-start"
          leftIcon={<FiChevronLeft w="25px" h="25px" />}
          fontFamily="Inter, san-serif"
          fontWeight="800"
          fontSize="15px"
          color="#000"
          background="none"
          borderRadius="4px"
          padding="9px 16px"
          maxHeight="38px"
          maxWidth="186.67px"
        >
          Edit
        </Button>
      </Flex>
    </>
  );
};

export default EditNotes;
