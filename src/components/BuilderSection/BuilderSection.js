import { Flex, Heading, useMediaQuery } from '@chakra-ui/react';
import AccordionModule from './AccordionModule';

const BuilderSection = () => {
  // setup conditional media query hook to render conditionally based on viewport width
  const [isLargerThan420] = useMediaQuery('(min-width: 420px)');

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
        >
          {isLargerThan420
            ? 'Build your show notes here'
            : 'Show Notes Builder'}
        </Heading>
      </Flex>
      <Flex overflow="scroll" h="100%" w="100%" className="builder__section">
        <AccordionModule />
      </Flex>
    </Flex>
  );
};
export default BuilderSection;
