import { Flex, Button } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

const PreviewNotes = () => {
  return (
    <>
      <Flex
        display={{ base: "flex", lg: "none" }}
        className="nav__copy-shownotes-btn"
        backgroundColor="#fff"
      >
        <Button
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
