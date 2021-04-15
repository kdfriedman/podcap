import { useContext } from "react";
import { Flex, Image, Link, useMediaQuery } from "@chakra-ui/react";
import CopyShownotes from "./CopyShownotes";
import PreviewNotes from "./PreviewNotes";
import EditNotes from "./EditNotes";
import { TouchDeviceContext } from "../../context/TouchDeviceContext";

const Nav = () => {
  // get touch device context updater function to change visible state of sections
  const [touchDeviceSectionVisibilityList] = useContext(TouchDeviceContext);
  const [builderSection, previewSection] = touchDeviceSectionVisibilityList;

  // initialize media query hook from chakra, used for conditionally rendering content based on viewport width
  const [isLargerThan420] = useMediaQuery("(min-width: 420px)");
  const [isLargerThan950] = useMediaQuery("(min-width: 950px)");

  const renderCopyShowNotes = () => {
    if (isLargerThan950) return <CopyShownotes />;
    if (previewSection.isSectionVisible) return <CopyShownotes />;
  };

  return (
    <>
      <Flex
        className="nav"
        flex="1 0 auto"
        p="0 24px"
        justify="space-between"
        backgroundColor="#fff"
        h="64px"
        boxShadow="0 2px 4px 0 rgb(0 0 0 / 10%)"
        align="center"
        pos="relative"
      >
        {builderSection.isSectionVisible && (
          <Link className="nav__logo" href="https://www.podcap.io/" isExternal>
            <Image
              maxW={isLargerThan420 ? "140px" : "42px"}
              maxH={isLargerThan420 ? "42px" : "42px"}
              w="100%"
              h="100%"
              src={
                isLargerThan420
                  ? "/assets/podcap-logo.png"
                  : "/assets/podcap_logo-svg.svg"
              }
              alt="Podcap Logo"
            />
          </Link>
        )}
        {builderSection.isSectionVisible && <PreviewNotes />}
        {previewSection.isSectionVisible && <EditNotes />}
        {renderCopyShowNotes()}
      </Flex>
    </>
  );
};

export default Nav;
