import React, { useContext } from "react";
import { Flex, Button, useToast } from "@chakra-ui/react";
import ClipboardIcon from "../../styles/custom-icons/ClipboardIcon";
import { BuilderContext } from "../../context/BuilderContext";

const CopyShownotes = () => {
  // get context updater function to keep track of global state
  const [builderSectionTextarea] = useContext(BuilderContext);

  // instantiate toast component from chakra
  const toast = useToast();

  // copy show notes using async clipboard api
  const copyShowNotes = async (text) => {
    // check if browser supports clipboard api, text argument is truthy, and is secure context
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // write copied text to clipboard api via await
        await navigator.clipboard.writeText(text);
        // configure toast component with custom settings object
        return toast({
          title: "Show notes copied to clipboard",
          position: "top",
          isClosable: true,
          status: "success",
          duration: 2000,
        });
      }

      // if browser does not support navigator.clipboard use fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);

      // handle iOS as a special case
      if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        // save current contentEditable/readOnly status
        const editable = textArea.contentEditable;
        const readOnly = textArea.readOnly;

        // convert to editable with readonly to stop iOS keyboard opening
        textArea.contentEditable = true;
        textArea.readOnly = true;

        // create a selectable range
        const range = document.createRange();
        range.selectNodeContents(textArea);

        // select the range
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);

        // restore contentEditable/readOnly to original state
        textArea.contentEditable = editable;
        textArea.readOnly = readOnly;
      } else {
        textArea.focus();
        textArea.select();
      }
      // copy text
      const copiedText = document.execCommand("copy");
      console.log(copiedText);
      // remove child from DOM
      document.body.removeChild(textArea);

      // configure toast component with custom settings object
      return toast({
        title: "Show notes copied to clipboard",
        position: "top",
        isClosable: true,
        status: "success",
        duration: 2000,
      });
    } catch (err) {
      console.log(err);
      // handle all errors
      return toast({
        title:
          "We're sorry, your browser does not support copy clipboard functionality",
        position: "top",
        isClosable: true,
        status: "error",
        duration: 2000,
      });
    }
  };

  // handle show notes button click event
  const handleShowNotesButtonClick = async (e) => {
    // check if evt target id is clipboard button, otherwise return
    if (!e.target.closest("#clipboardIconBtn")) return;

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
  };

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
