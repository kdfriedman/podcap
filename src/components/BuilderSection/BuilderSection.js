import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import AccordionModule from './AccordionModule';

const BuilderSection = () => {
  return (
    <Flex
      h="100%"
      alignItems="center"
      justifyContent="center"
      className="builder__section-container"
      direction="column"
    >
      <Flex
        h="60px"
        minH="60px"
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
          display="flex"
          direction="column"
          alignItems="center"
        >
          <Image
            maxWidth="23px"
            maxHeight="23px"
            src="/assets/hand_wave_emoji.svg"
            marginRight="7px"
          />
          <Text>Build your show notes here</Text>
        </Heading>
        <Image
          src="/assets/build-notes-arrow.png"
          maxHeight="3.25rem"
          position="relative"
          top="10px"
        />
      </Flex>
      <Flex overflow="scroll" h="100%" w="100%" className="builder__section">
        <AccordionModule />
      </Flex>
    </Flex>
  );
};
export default BuilderSection;
