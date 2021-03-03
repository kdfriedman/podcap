import { Flex, Box, Spacer } from "@chakra-ui/react";
import Header from "../Header/Header";
import BuilderSection from "../BuilderSection/BuilderSection";

const BuilderPage = () => {
  return (
    <>
      {/* init the header in main App Page component, independent of other components */}
      <Header />
      <Flex className="builder__container">
        <Box className="builder__form-section" w="55%" h="100vh" bg="#fff">
          {/* Wire up builder section component */}
          <BuilderSection />
        </Box>
        {/* creates the vertical border in the main layout */}
        <Spacer
          className="builder__vertical-divider"
          borderLeft="1px solid #CCCCCC"
        />
        <Box className="builder__preview-section" w="45%" h="100vh" bg="#fff" />
      </Flex>
    </>
  );
};

export default BuilderPage;
