import { useState } from "react";
import { Flex, Button, Link, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import PodcastPreview from "./PodcastPreview";
import EmailPreview from "./EmailPreview";
import { FiChevronRight } from "react-icons/fi";

const PreviewSection = () => {
  // create preview btn state, used for rendering active btn state
  const [previewBtnList, updatePreviewBtnList] = useState([
    { btnText: "Podcast Preview", isActive: true, id: 1 },
    { btnText: "Email Preview", isActive: false, id: 2 },
  ]);
  // deconstruct previewBtnList into podcast and email objects
  const [podcastPreviewBtn] = previewBtnList;

  // map of preview section button styles for active vs inactive state
  const previewSectionHeaderButtonDictionary = new Map();
  previewSectionHeaderButtonDictionary.set("active", {
    backgroundColor: "#EADFFF",
    border: "1.5px solid #773AE7",
  });
  previewSectionHeaderButtonDictionary.set("inactive", {
    backgroundColor: "#fff",
    border: "1.5px solid #AAAAAA",
  });

  // handle podcast/email preview click
  const handleClick = (e) => {
    const btn = e.target.closest("button");
    if (!btn || btn.dataset.isActive === "true") return;
    const newArr = previewBtnList.map((previewBtn) => {
      const { isActive } = previewBtn;
      return { ...previewBtn, isActive: !isActive };
    });
    updatePreviewBtnList(newArr);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      className="builder__section-container"
      height="100%"
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
        <Button
          onClick={handleClick}
          data-btn-id={1}
          data-is-active={previewBtnList[0].isActive}
          padding="10px 20px"
          color="#000"
          fontWeight="800"
          fontSize="16px"
          borderRadius="6px 0px 0px 6px"
          style={previewSectionHeaderButtonDictionary.get(
            `${previewBtnList[0].isActive ? "active" : "inactive"}`
          )}
        >
          {previewBtnList[0].btnText}
        </Button>
        <Button
          onClick={handleClick}
          data-btn-id={2}
          data-is-active={previewBtnList[1].isActive}
          padding="10px 20px"
          color="#000"
          fontWeight="800"
          fontSize="16px"
          borderRadius="0px 6px 6px 0px"
          style={previewSectionHeaderButtonDictionary.get(
            `${previewBtnList[1].isActive ? "active" : "inactive"}`
          )}
        >
          {previewBtnList[1].btnText}
        </Button>
      </Flex>
      <Flex
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundImage='url("/assets/preview-section-mobile-frame.png")'
        className="builder__section"
        height="100%"
        width="520px"
        justify="center"
        marginTop="1.75rem"
        minHeight="0"
      >
        {/* Instantiate active preview render */}
        {podcastPreviewBtn.isActive ? <PodcastPreview /> : <EmailPreview />}
      </Flex>
      <Flex
        height="56px"
        minHeight="56px"
        backgroundColor="#3F3D56"
        className="builder__section-preview-footer-container"
        w="100%"
        justifyContent="center"
        alignItems="center"
        zIndex="1"
      >
        <Text
          textAlign="center"
          fontSize="14px"
          fontWeight="500"
          color="#ffffff"
          className="builder__section-preview-footer"
          fontFamily="Inter, san-serif"
          lineHeight="1.3rem"
        >
          An example of how your show notes will appear in a podcast app.{" "}
          <Link color="#92FAEF" href="https://www.podcap.io/" isExternal>
            Learn more
            <ExternalLinkIcon h="1rem" w="1rem" as={FiChevronRight} />
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default PreviewSection;
