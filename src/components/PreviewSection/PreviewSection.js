import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";

const PreviewSection = () => {
  const [previewBtnList, updatePreviewBtnList] = useState([
    { btnText: "Podcast Preview", isActive: true, id: 1 },
    { btnText: "Email Preview", isActive: false, id: 2 },
  ]);

  // map of preview section button styles for active vs inactive state
  const previewSectionHeaderButtonDictionary = new Map();
  previewSectionHeaderButtonDictionary.set("active", {
    backgroundColor: "#EADFFF",
    border: "1.5px solid #773AE7",
  });
  previewSectionHeaderButtonDictionary.set("inactive", {
    backgroundColor: "#fff",
    border: "1.5px solid #773AE7",
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
    <Flex className="builder__section-container">
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
      <Flex className="builder__section"></Flex>
    </Flex>
  );
};

export default PreviewSection;
