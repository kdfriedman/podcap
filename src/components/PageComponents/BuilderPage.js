import { useContext } from "react";
import { Flex, Box, Spacer } from "@chakra-ui/react";
import Header from "../Header/Header";
import BuilderSection from "../BuilderSection/BuilderSection";
import PreviewSection from "../PreviewSection/PreviewSection";
import { TouchDeviceContext } from "../../context/TouchDeviceContext";

const BuilderPage = () => {
  const [touchDeviceSectionVisibilityList] = useContext(TouchDeviceContext);
  const [builderSection, previewSection] = touchDeviceSectionVisibilityList;

  return (
    <>
      {/* init the header in main App Page component, independent of other components */}
      <Header />
      <Flex h="calc(100vh - 64px)" bg="#efefef" className="builder__container">
        <Box
          display={
            builderSection.isSectionVisible
              ? { base: "block", lg: "block" }
              : { base: "none", lg: "block" }
          }
          className="builder__form-section"
          w={{
            lg: "50%",
            base: "100%",
          }}
          h="100%"
          bg="#efefef"
        >
          {/* Wire up builder section component */}
          <BuilderSection />
        </Box>
        {/* creates the vertical border in the main layout */}
        <Spacer
          display={{ base: "none", lg: "block" }}
          className="builder__vertical-divider"
          borderLeft="1px solid #CCCCCC"
        />
        <Box
          display={
            previewSection.isSectionVisible
              ? { base: "block", lg: "block" }
              : { base: "none", lg: "block" }
          }
          className="builder__preview-section"
          w={{
            lg: "50%",
            base: "100%",
          }}
          h="100%"
          bg="#efefef"
        >
          {/* Wire up preview section component */}
          <PreviewSection />
        </Box>
      </Flex>
    </>
  );
};

export default BuilderPage;
