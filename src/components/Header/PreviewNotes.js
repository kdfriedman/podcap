import { useContext } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { TouchDeviceContext } from "../../context/TouchDeviceContext";

const PreviewNotes = () => {
  // get touch device context updater function to change visible state of sections
  const [, updateTouchDeviceSectionVisibilityList] = useContext(
    TouchDeviceContext
  );

  const renderPreviewShowNotes = (e) => {
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
          onClick={renderPreviewShowNotes}
          id="previewNotesBtn"
          _hover={{
            opacity: ".8",
          }}
          justifyContent="flex-start"
          rightIcon={<FiChevronRight w="25px" h="25px" />}
          fontFamily="Inter, san-serif"
          fontWeight="800"
          fontSize="15px"
          color="#fff"
          backgroundColor="#000"
          borderRadius="4px"
          padding="9px 16px"
          maxHeight="38px"
          maxWidth="186.67px"
        >
          Preview Notes
        </Button>
      </Flex>
    </>
  );
};

export default PreviewNotes;
