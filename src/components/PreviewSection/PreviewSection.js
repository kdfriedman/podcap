import { Flex, Box } from "@chakra-ui/react";

const PreviewSection = () => {
  return (
    <Flex className="builder__section-container">
      <Box className="builder__section-header"></Box>
      <Box className="builder__section"></Box>
    </Flex>
  );
};

export default PreviewSection;
