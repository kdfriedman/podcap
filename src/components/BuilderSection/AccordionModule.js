import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";

const AccordionModule = () => {
  return (
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
      <AccordionItem w="100%">
        <h2>
          <AccordionButton
            _hover={{
              background: "none",
            }}
            p="16px"
            maxH="56px"
          >
            <DragHandleIcon
              marginRight="13px"
              marginLeft=" 4px"
              color="#888888"
              fontWeight="900"
            />
            <Checkbox
              data-is-checkbox
              borderRadius="4px"
              colorScheme="brand"
              className="builder__section-checkbox"
              size="lg"
              mr="8px"
              defaultIsChecked
            />
            <Box
              color="#111"
              fontSize="17px"
              fontWeight="700"
              flex="1"
              textAlign="left"
            >
              Episode Summary
            </Box>
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
            <strong>Tip:</strong> Provide an overview describing the main
            episode highlights.
          </Text>
          <Textarea
            placeholder="Enter notes..."
            minH="180px"
            mt="8px"
            resize="none"
            pb={4}
          />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem w="100%">
        <h2>
          <AccordionButton
            _hover={{
              background: "none",
            }}
            p="16px"
            maxH="56px"
          >
            <DragHandleIcon
              marginRight="13px"
              marginLeft=" 4px"
              color="#888888"
              fontWeight="900"
            />
            <Checkbox
              borderRadius="4px"
              colorScheme="brand"
              className="builder__section-checkbox"
              size="lg"
              mr="8px"
              defaultIsChecked
            />
            <Box
              color="#111"
              fontSize="17px"
              fontWeight="700"
              flex="1"
              textAlign="left"
            >
              Guest Info
            </Box>
            <AccordionIcon w="2rem" h="2rem" />
          </AccordionButton>
        </h2>
        <AccordionPanel pt="0" pb={4}>
          <Text
            color="#666"
            fontSize="14px"
            lineHeight="1.3em"
            className="builder__accordion-tip-text"
          >
            <strong>Tip:</strong> Introduce your episode guest and include links
            with more information.
          </Text>
          <Textarea minH="180px" mt="8px" resize="none" pb={4} />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem w="100%">
        <h2>
          <AccordionButton
            _hover={{
              background: "none",
            }}
            p="16px"
            maxH="56px"
          >
            <DragHandleIcon
              marginRight="13px"
              marginLeft=" 4px"
              color="#888888"
              fontWeight="900"
            />
            <Checkbox
              borderRadius="4px"
              colorScheme="brand"
              className="builder__section-checkbox"
              size="lg"
              mr="8px"
              defaultIsChecked
            />
            <Box
              color="#111"
              fontSize="17px"
              fontWeight="700"
              flex="1"
              textAlign="left"
            >
              Referenced Media
            </Box>
            <AccordionIcon w="2rem" h="2rem" />
          </AccordionButton>
        </h2>
        <AccordionPanel pt="0" pb={4}>
          <Text
            color="#666"
            fontSize="14px"
            lineHeight="1.3em"
            className="builder__accordion-tip-text"
          >
            <strong>Tip:</strong> Provide an overview describing the main
            episode highlights.
          </Text>
          <Textarea minH="180px" mt="8px" resize="none" pb={4} />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem w="100%">
        <h2>
          <AccordionButton
            _hover={{
              background: "none",
            }}
            p="16px"
            maxH="56px"
          >
            <DragHandleIcon
              marginRight="13px"
              marginLeft=" 4px"
              color="#888888"
              fontWeight="900"
            />
            <Checkbox
              borderRadius="4px"
              colorScheme="brand"
              className="builder__section-checkbox"
              size="lg"
              mr="8px"
              defaultIsChecked
            />
            <Box
              color="#111"
              fontSize="17px"
              fontWeight="700"
              flex="1"
              textAlign="left"
            >
              Sponsored Links
            </Box>
            <AccordionIcon w="2rem" h="2rem" />
          </AccordionButton>
        </h2>
        <AccordionPanel pt="0" pb={4}>
          <Text
            color="#666"
            fontSize="14px"
            lineHeight="1.3em"
            className="builder__accordion-tip-text"
          >
            <strong>Tip:</strong> Provide an overview describing the main
            episode highlights.
          </Text>
          <Textarea minH="180px" mt="8px" resize="none" pb={4} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionModule;
