import { useContext } from "react";
import { Flex, Icon, Text, Spacer } from "@chakra-ui/react";
import { AiFillPlayCircle } from "react-icons/ai";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { BuilderContext } from "../../context/BuilderContext";

const PodcastPreview = () => {
  // reference context data store to access textarea user value to render to screen
  const [builderSectionTextareaList] = useContext(BuilderContext);
  console.log(builderSectionTextareaList);

  const hasEmptyBuilderSectionTextareaValues = builderSectionTextareaList.every(
    (builderSectionTextarea) => builderSectionTextarea.text === ""
  );

  return (
    <Flex
      justify="flex-start"
      w="380px"
      border="1px solid #888"
      borderRadius="4px"
      className="builder__section-podcast-preview"
      position="relative"
      marginTop="4.5rem"
      direction="column"
      borderBottom="none"
      borderBottomRightRadius="0"
      borderBottomLeftRadius="0px"
      overflowY="scroll"
    >
      <Flex className="builder__section-podcast-brand-container">
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          backgroundColor="#e8e8e8"
          borderRadius="6px"
          h="64px"
          w="64px"
          margin="15px 0 0 15px"
          className="builder__section-podcast-brand-img-container"
        >
          <Text
            fontFamily="Helvetica Neue, Roboto, san-serif"
            fontSize="12px"
            color="#888888"
            className="builder__section-podcast-logo-text"
          >
            LOGO
          </Text>
        </Flex>
        <Flex
          h="28px"
          w="28px"
          backgroundColor="#fff"
          borderRadius="50%"
          className="builder__section-podcast-add-icon-circle-bg"
          position="relative"
          top="3.5rem"
          right="1.2rem"
          justifyContent="center"
          alignItems="center"
        >
          <Icon
            h="26px"
            w="26px"
            className="builder__section-podcast-add-icon"
            as={AiFillPlusCircle}
            fill="#6E41E2"
          />
        </Flex>
        <Flex
          direction="column"
          marginTop="15px"
          className="builder__section-podcast-brand-heading"
          position="relative"
          right="15px"
        >
          <Text
            fontFamily="Helvetica Neue, Roboto, san-serif"
            fontSize="12px"
            color="#888888"
            lineHeight="120%"
          >
            Podcast Name
          </Text>
          <Text
            fontFamily="Helvetica Neue, Roboto, san-serif"
            fontSize="19px"
            color="#111111"
            lineHeight="125%"
          >
            Episode Title
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction="row"
        justifyContent="space-between"
        className="builder__section-podcast-controls-container"
        margin="15px 14px 0 12px"
      >
        <Icon
          h="32px"
          w="32px"
          fill="#CCCCCC"
          className="builder__section-podcast-play-icon"
          as={AiFillPlayCircle}
        />
        <Icon
          h="32px"
          w="32px"
          fill="#CCCCCC"
          className="builder__section-podcast-dots-circle-icon"
          as={HiDotsCircleHorizontal}
        />
      </Flex>
      <Spacer
        className="builder__horizontol-divider"
        borderTop="1px solid #CBCBCB"
        margin="15px 14px 0 12px"
        maxHeight="1px"
      />
      <Flex
        direction="column"
        className="builder__section-podcast-shownotes-container"
        justifyContent="center"
      >
        {/* Check if builder sections are all empty */}
        {!hasEmptyBuilderSectionTextareaValues ? (
          builderSectionTextareaList.map((section) => {
            return (
              <Text
                whiteSpace="pre"
                display={!section.isVisible ? "none" : ""}
                fontWeight="400"
                fontFamily="Helvetica Neue, Roboto, san-serif"
                fontSize="16px"
                lineHeight="20px"
                color="#222222"
                className="builder__section-podcast-shownotes-text"
                margin="12px 15px"
                id={`podcastPreviewShownotesText-${section?.id}`}
                key={section?.id}
              >
                {section?.text}
              </Text>
            );
          })
        ) : (
          <>
            <Flex
              marginTop="5rem"
              alignSelf="center"
              h="98px"
              w="98px"
              backgroundColor="#F5F5F5"
              borderRadius="50%"
              className="builder__section-podcast-shownotes-circle-bg"
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                color="#d0d0d0"
                h="40px"
                w="40px"
                className="builder__section-podcast-shownotes-edit-icon"
                as={FiEdit}
              />
            </Flex>
            <Text
              marginTop="15px"
              alignSelf="center"
              maxWidth="268px"
              textAlign="center"
              fontFamily="Inter, sans-serif"
              fontSize="15px"
              lineHeight="20.25px"
              fontWeight="300"
              color="#888888"
              className="builder__section-podcast-shownotes-preview-text"
            >
              Add your episode show notes to the form on the left to preview
              here.
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default PodcastPreview;
