import { useEffect, useState, useContext } from "react";
import { Flex, Button, useToast } from "@chakra-ui/react";
import ClipboardIcon from "../../styles/custom-icons/ClipboardIcon";
import { BuilderContext } from "../../context/BuilderContext";

const CopyShownotes = () => {
  // get context updater function to keep track of global state
  const [builderSectionTextarea] = useContext(BuilderContext);

  // instantiate toast component from chakra
  const toast = useToast();
  // set state for show notes button
  const [isShowNotesButtonSelected, updateShowNotesButtonSelected] = useState(
    false
  );

  // handle show notes button click event
  const handleShowNotesButtonClick = (e) => {
    // check if evt target id is clipboard button, otherwise return
    if (!e.target.closest("#clipboardIconBtn")) return;
    // update show notes button state to true to activate useEffect call
    updateShowNotesButtonSelected(true);
  };

  // run async copyShownotes if copy show notes button state is true
  useEffect(() => {
    // copy show notes using async clipboard api
    const copyShowNotes = async (text) => {
      // check if browser supports clipboard api and text argument is truthy
      if (navigator.clipboard) {
        // write copied text to clipboard api via await
        await navigator.clipboard.writeText(text);
        // configure toast component with custom settings object
        toast({
          title: "Show notes copied to clipboard",
          position: "top",
          isClosable: true,
          status: "success",
          duration: 2000,
        });
        // reset show notes button bool state to false
        return updateShowNotesButtonSelected(false);
      }
      toast({
        title:
          "We're sorry, your browser does not support copy clipboard functionality",
        position: "top",
        isClosable: true,
        status: "error",
        duration: 2000,
      });
      return updateShowNotesButtonSelected(true);
    };
    // check if show notes button state is true - if a user selects the button
    if (isShowNotesButtonSelected) {
      const copiedTextListOfStrings = builderSectionTextarea.reduce(
        (accum, section) => {
          if (section.text) {
            accum.push(section.text);
          }
          return accum;
        },
        []
      );
      const copiedTextJoinedString = copiedTextListOfStrings.join("\n\n");
      // pass in text string to be written to clipboard api
      copyShowNotes(copiedTextJoinedString);
    }
  }, [isShowNotesButtonSelected, toast, builderSectionTextarea]);

  return (
    <>
      <Flex
        // display={{ base: "none", lg: "flex" }}
        className="nav__copy-shownotes-btn"
        backgroundColor="#fff"
      >
        <Button
          onClick={handleShowNotesButtonClick}
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
