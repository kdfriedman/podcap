import { Flex, Button } from "@chakra-ui/react";
import ClipboardIcon from "../../styles/custom-icons/ClipboardIcon";

const CopyShownotes = () => {
  return (
    <>
      <Flex className="nav__copy-shownotes-btn" backgroundColor="#fff">
        <Button
          id="clipboardIconBtn"
          _hover={{
            opacity: ".8",
          }}
          justifyContent="flex-start"
          leftIcon={<ClipboardIcon w="20px" h="20px" />}
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
          Copy Show Notes
        </Button>
      </Flex>
    </>
  );
};

export default CopyShownotes;
