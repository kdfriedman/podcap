import { Flex, Heading } from "@chakra-ui/react";
import AccordionModule from "./AccordionModule";

const BuilderSection = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className="builder__section-container"
      direction="column"
    >
      <Flex
        h="60px"
        alignItems="center"
        justifyContent="center"
        className="builder__section-header"
        bgColor="#fff"
        w="100%"
        borderBottom="1px solid #ccc"
      >
        <Heading
          color="#111"
          isTruncated
          as="h1"
          fontSize="20px"
          fontWeight="800"
          lineHeight="1.4em"
          textAlign="center"
        >
          Podcast Episode Show Notes Builder
        </Heading>
      </Flex>
      <Flex w="100%" className="builder__section">
        <AccordionModule />
      </Flex>
    </Flex>
  );
};
export default BuilderSection;
