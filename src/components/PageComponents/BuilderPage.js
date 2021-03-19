import { Flex, Box, Spacer } from "@chakra-ui/react";
import Header from "../Header/Header";
import BuilderSection from "../BuilderSection/BuilderSection";
import PreviewSection from "../PreviewSection/PreviewSection";

const BuilderPage = () => {
  return (
    <>
      {/* init the header in main App Page component, independent of other components */}
      <Header />
      <Flex h="calc(100vh - 64px)" bg="#efefef" className="builder__container">
        <Box className="builder__form-section" w="50%" h="100%" bg="#efefef">
          {/* Wire up builder section component */}
          <BuilderSection />
        </Box>
        {/* creates the vertical border in the main layout */}
        <Spacer
          className="builder__vertical-divider"
          borderLeft="1px solid #CCCCCC"
        />
        <Box className="builder__preview-section" w="50%" h="100%" bg="#efefef">
          <PreviewSection />
        </Box>
      </Flex>
    </>
  );
};

export default BuilderPage;
