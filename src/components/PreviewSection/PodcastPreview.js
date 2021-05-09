import { useContext, useState, useEffect } from "react";
import {
  Flex,
  Icon,
  Text,
  Image,
  Spacer,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillPlayCircle } from "react-icons/ai";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { BuilderContext } from "../../context/BuilderContext";
import AddPodcastInfo from "./AddPodcastInfo";
import { PreviewContext } from "../../context/PreviewContext";

const PodcastPreview = () => {
  // setup conditional media query hook to render conditionally based on viewport width
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  const [isLargerThan425] = useMediaQuery("(min-width: 425px)");

  // chakra handlers for modal component
  const { isOpen, onOpen, onClose } = useDisclosure();

  // reference context data store to access textarea user value to render to screen
  const [builderSectionTextareaList] = useContext(BuilderContext);

  // reference context data store for form data (input text and images)
  const { fileToBase64 } = useContext(PreviewContext);
  const { podcastInfoSubmitCount } = useContext(PreviewContext);
  const { formInputText } = useContext(PreviewContext);
  const [podcastNameInput, podcastTitleInput] = formInputText;

  // podcast info submit state
  const [isPodcastInfoSubmitted, updateIsPodcastInfoSubmitted] = useState(null);
  // keep local state to determine if image is being stored in context
  const [hasImageStoredInContext, updateHasImageStoredInContext] = useState(
    null
  );
  // keep state to keep track how many times the form has been submitted
  const [formSubmitCount, updateFormSubmitCount] = useState(0);

  // using to avoid memory leaks when updating context store from child component async function
  useEffect(() => {
    if (fileToBase64 && podcastInfoSubmitCount >= 1) {
      updateHasImageStoredInContext(true);
      updateFormSubmitCount(
        (formSubmitCount) => formSubmitCount + podcastInfoSubmitCount
      );
    }
  }, [fileToBase64, podcastInfoSubmitCount]);

  // used for checking if textarea elements have any saved text in context data store
  const hasEmptyBuilderSectionTextareaValues = builderSectionTextareaList.every(
    (builderSectionTextarea) => builderSectionTextarea.text === ""
  );

  const renderAddPodcastInfo = () => {
    if (
      isPodcastInfoSubmitted ??
      (hasImageStoredInContext && formSubmitCount >= 1)
    ) {
      return (
        <Flex
          h="5rem"
          className="builder__section-podcast-image-preview-container"
        >
          <Image
            maxWidth="100%"
            height="100%"
            overflow="hidden"
            objectFit="cover"
            alt="podcast brand"
            className="builder__section-podcast-image-preview"
            src={fileToBase64}
            id="podcastPreviewImage"
            borderRadius="6px"
            maxH="64px"
            maxW="64px"
            margin="15px"
          />
        </Flex>
      );
    }

    return (
      <>
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
          onClick={onOpen}
        >
          <Icon
            h="26px"
            w="26px"
            className="builder__section-podcast-add-icon"
            as={AiFillPlusCircle}
            fill="#6E41E2"
            cursor="pointer"
          />
          <AddPodcastInfo
            isOpen={isOpen}
            onClose={onClose}
            updateIsPodcastInfoSubmitted={updateIsPodcastInfoSubmitted}
          />
        </Flex>
      </>
    );
  };

  return (
    <Flex
      justify="flex-start"
      w={isLargerThan450 ? "380px" : isLargerThan425 ? "315px" : "295px"}
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
        {/* Render AddPodcastInfo component */}
        {renderAddPodcastInfo()}
        <Flex
          direction="column"
          marginTop="15px"
          className="builder__section-podcast-brand-heading"
          position="relative"
          right={
            isPodcastInfoSubmitted ??
            (hasImageStoredInContext && formSubmitCount >= 1)
              ? ""
              : "15px"
          }
        >
          <Text
            fontFamily="Helvetica Neue, Roboto, san-serif"
            fontSize="12px"
            color="#888888"
            lineHeight="120%"
          >
            {podcastNameInput.text || "Podcast Name"}
          </Text>
          <Text
            fontFamily="Helvetica Neue, Roboto, san-serif"
            fontSize="19px"
            color="#111111"
            lineHeight="125%"
          >
            {podcastTitleInput.text || "Episode Title"}
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
                whiteSpace="pre-line"
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
              marginBottom="2rem"
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
