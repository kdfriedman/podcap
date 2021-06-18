import { useContext, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Icon,
  Text,
  Spacer,
  Image,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { FiMail, FiTrash, FiEdit } from 'react-icons/fi';
import { BiArchiveIn, BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiFillPlusCircle, AiFillPlayCircle } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';

import { FaUserCircle } from 'react-icons/fa';
import { BuilderContext } from '../../context/BuilderContext';
import AddPodcastInfo from './AddPodcastInfo';
import { PreviewContext } from '../../context/PreviewContext';
import parse from 'html-react-parser';

const EmailPreview = () => {
  // setup conditional media query hook to render conditionally based on viewport width
  const [isLargerThan450] = useMediaQuery('(min-width: 450px)');

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

  const hasEmptyBuilderSectionTextareaValues = builderSectionTextareaList.every(
    (builderSectionTextarea) => builderSectionTextarea.text === ''
  );
  return (
    <Flex
      justify="flex-start"
      w={isLargerThan450 ? '338px' : '290px'}
      border="1px solid #888"
      borderRadius="4px"
      className="builder__section-email-preview"
      position="relative"
      marginTop="3rem"
      direction="column"
      borderBottom="none"
      borderBottomRightRadius="0"
      borderBottomLeftRadius="0px"
      overflowY="scroll"
    >
      <Flex
        justifyContent="flex-start"
        className="builder__section-email-menu-container"
        margin="15px 15px 0"
      >
        <Icon
          color="#AAAAAA"
          h="20px"
          w="auto"
          className="builder__section-email-arrow-icon"
          as={IoChevronBackSharp}
        />
        <Icon
          h="20px"
          w="auto"
          color="#AAAAAA"
          marginLeft="auto"
          className="builder__section-email-archive-icon"
          as={BiArchiveIn}
        />
        <Icon
          marginLeft="1rem"
          h="20px"
          w="auto"
          color="#AAAAAA"
          className="builder__section-email-delete-icon"
          as={FiTrash}
        />
        <Icon
          marginLeft="1rem"
          h="20px"
          w="auto"
          color="#AAAAAA"
          className="builder__section-email-mail-icon"
          as={FiMail}
        />
        <Icon
          marginLeft="1rem"
          h="20px"
          w="auto"
          color="#AAAAAA"
          className="builder__section-email-mail-icon"
          as={BiDotsHorizontalRounded}
        />
      </Flex>
      <Flex
        margin="15px 15px 0"
        className="builder__section-email-brand-container"
        direction="column"
      >
        <Flex
          direction="row"
          justifyContent="flex-start"
          className="builder__section-email-brand-header-container"
          alignItems="center"
        >
          <Text
            className="builder__section-email-title"
            fontSize="19px"
            fontFamily="Helvetica Neue, Roboto, san-serif"
            fontWeight="500"
            lineHeight="23.75px"
          >
            {podcastTitleInput.text || 'New episode: Episode Title'}
          </Text>
          {!podcastTitleInput.text && (
            <Icon
              marginLeft="8px"
              className="builder__section-email-add-icon"
              h="23px"
              w="23px"
              as={AiFillPlusCircle}
              fill="#6E41E2"
              onClick={onOpen}
              cursor="pointer"
            />
          )}
        </Flex>
        <Flex
          justifyContent="flex-start"
          direction="row"
          className="builder__section-email-brand-content-container"
          marginTop="11px"
        >
          <Icon
            className="builder__section-email-user-icon"
            h="32px"
            w="32px"
            as={FaUserCircle}
            fill="#CCCCCC"
            alignSelf="center"
          />
          <Flex
            marginLeft="10px"
            className="builder__section-email-recipient-container"
            direction="column"
            minW="0"
          >
            <Text
              fontWeight="500"
              fontSize="14px"
              lineHeight="16.8px"
              fontFamily="Helvetica Neue, Roboto, san-serif"
              className="builder__section-email-sender-name"
              isTruncated
            >
              {podcastNameInput.text || 'Podcast Name'}
            </Text>
            <Text
              fontWeight="400"
              fontSize="15px"
              lineHeight="18px"
              fontFamily="Helvetica Neue, Roboto, san-serif"
              className="builder__section-email-receiver-name"
              color="#8C8C8C"
            >
              to listener
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Spacer
        className="builder__horizontol-divider"
        borderTop="1px solid #CBCBCB"
        margin="15px 14px 0 12px"
        maxHeight="1px"
      />

      <Flex
        direction="column"
        className="builder__section-email-podcast-title-container"
        margin="15px 15px 0 15px"
      >
        <Text
          fontSize="14px"
          lineHeight="17.5px"
          fontFamily="Inter, san-serif"
          fontWeight="700"
          color="#626262"
          textTransform="uppercase"
          className="builder__section-email-podcast-eyebrow"
        >
          New Episode:
        </Text>
        <Text
          fontSize="20px"
          lineHeight="25px"
          fontFamily="Inter, san-serif"
          fontWeight="700"
          color="#000000"
          className="builder__section-email-podcast-title"
        >
          {podcastTitleInput.text || 'Episode Title'}
        </Text>
      </Flex>

      {/* email podcast module - start */}
      <Flex
        className="builder__section-email-podcast-module"
        background="#FFFFFF"
        border="1px solid #CCCCCC"
        boxSizing="border-box"
        borderRadius="4px"
        margin="15px 15px 0 15px"
        width={isLargerThan450 ? '306px' : '258px'}
        height="104px"
        boxShadow="0 2px 5px 0 rgb(0 0 0 / 15%)"
      >
        {isPodcastInfoSubmitted ??
        (hasImageStoredInContext && formSubmitCount >= 1) ? (
          <Flex
            className="builder__section-podcast-image-preview-container"
            maxHeight="88px"
            alignItems="center"
            onClick={onOpen}
          >
            <Box
              className="builder__section-modal-edit-icon-container"
              position="absolute"
              top="260px"
              left="21px"
              width="78px"
              height="78px"
              backgroundColor="#00000038"
              borderRadius="6px"
              display="none"
              zIndex="1"
              _hover={{
                cursor: 'pointer',
              }}
            >
              <Icon
                w="1.25rem"
                h="1.25rem"
                display="block"
                className="builder__section-modal-edit-icon"
                ml=".6rem"
                as={MdModeEdit}
                fill="#fff"
                marginLeft="auto"
                marginRight="auto"
                top="1.6rem"
                position="relative"
              />
            </Box>
            <Image
              justifyContent="center"
              width="100%"
              height="100%"
              overflow="hidden"
              objectFit="cover"
              alt="podcast brand"
              className="builder__section-podcast-image-preview"
              src={fileToBase64}
              id="podcastPreviewImage"
              borderRadius="10px"
              maxH="88px"
              maxW="88px"
              minH="88px"
              minW="88px"
              padding="5px"
            />
            <AddPodcastInfo
              isOpen={isOpen}
              onClose={onClose}
              updateIsPodcastInfoSubmitted={updateIsPodcastInfoSubmitted}
              hasImageStoredInContext={hasImageStoredInContext}
              updateHasImageStoredInContext={updateHasImageStoredInContext}
            />
          </Flex>
        ) : (
          <Flex
            className="builder__section-podcast-brand-img-container"
            alignItems="center"
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              direction="column"
              backgroundColor="#e8e8e8"
              borderRadius="6px"
              h="88px"
              w="88px"
              margin="7px"
              className="builder__section-podcast-brand-img-module"
            >
              <Text
                fontFamily="Helvetica Neue, Roboto, san-serif"
                fontSize="16px"
                color="#888888"
                className="builder__section-podcast-logo-text"
                lineHeight="16.2px"
                fontWeight="500"
              >
                LOGO
              </Text>
            </Flex>
            <Flex
              h="25px"
              w="25px"
              backgroundColor="#fff"
              borderRadius="50%"
              className="builder__section-podcast-add-icon-circle-bg"
              position="relative"
              top="33px"
              right="19px"
              justifyContent="center"
              alignItems="center"
              onClick={onOpen}
              cursor="pointer"
            >
              <Icon
                h="23px"
                w="23px"
                className="builder__section-podcast-add-icon"
                as={AiFillPlusCircle}
                fill="#6E41E2"
              />
              <AddPodcastInfo
                isOpen={isOpen}
                onClose={onClose}
                updateIsPodcastInfoSubmitted={updateIsPodcastInfoSubmitted}
                hasImageStoredInContext={hasImageStoredInContext}
                updateHasImageStoredInContext={updateHasImageStoredInContext}
              />
            </Flex>
          </Flex>
        )}

        <Flex
          direction="column"
          className="builder__section-podcast-controls-container"
          maxHeight="88px"
          justifyContent="center"
          marginLeft={
            isPodcastInfoSubmitted ??
            (hasImageStoredInContext && formSubmitCount >= 1)
              ? '5px'
              : '-16px'
          }
        >
          <Flex
            alignItems="center"
            className="builder__section-podcast-controls-content"
            position="relative"
            top={isLargerThan450 ? 0 : '4px'}
          >
            <Icon
              h="32px"
              w="32px"
              fill="#CCCCCC"
              className="builder__section-podcast-play-icon"
              as={AiFillPlayCircle}
            />
            <Flex
              direction="column"
              className="builder__section-podcast-controls-header"
              marginLeft="7px"
            >
              <Text
                fontFamily="Helvetica Neue, Roboto, san-serif"
                fontSize="12px"
                fontWeight="500"
                lineHeight="14.22px"
                color="#666666"
                className="builder__section-podcast-controls-eyebrow"
              >
                Your Podcast
              </Text>
              <Text
                fontFamily="Helvetica Neue, Roboto, san-serif"
                fontSize="16px"
                fontWeight="500"
                lineHeight="18.96px"
                color="#000000"
                className="builder__section-podcast-controls-title"
              >
                Listen Now
              </Text>
            </Flex>
          </Flex>

          <Flex className="builder__section-email-podcast-module-img-container">
            <Image
              w="234px"
              h={isLargerThan450 ? '46.53px' : '25px'}
              className="builder__section-email-podcast-module-img"
              src="/assets/audio-waves.svg"
              alt="audio wave"
              objectFit={isLargerThan450 ? '' : 'cover'}
              marginTop={isLargerThan450 ? 0 : '12px'}
            />
          </Flex>
        </Flex>
      </Flex>
      {/* email podcast module - end */}

      <Flex
        direction="column"
        className="builder__section-email-shownotes-container"
        justifyContent="center"
      >
        {!hasEmptyBuilderSectionTextareaValues ? (
          <Flex
            marginTop="5px"
            marginBottom="1rem"
            className="builder__section-email-shownotes-text-container"
            direction="column"
          >
            {builderSectionTextareaList.map((section) => {
              const listOfSectionTextWords = section.text.split(' ');
              const reformattedSectionTextArr = listOfSectionTextWords.map(
                (word) => {
                  word = word.replace(
                    /http(s)?:\/\/[\w-.]+\.[a-z]+\/?[^\s]+/gi,
                    `<a target='_blank' href='$&'><span class='hyperlink'>$&</span></a>`
                  );
                  return word;
                }
              );
              return (
                <Text
                  whiteSpace="pre-line"
                  display={!section.isVisible ? 'none' : ''}
                  fontWeight="400"
                  fontFamily="Helvetica Neue, Roboto, san-serif"
                  fontSize="16px"
                  lineHeight="20px"
                  color="#222222"
                  className="builder__section-email-shownotes-text"
                  margin="12px 15px"
                  key={`podcastEmailShownotesText-${section?.id}`}
                  id={section?.id}
                >
                  {/* pass in section text which is being reduced into a string which 
                may have injected span elements to deal with hyperlinks. Join array of words into final string */}
                  {parse(reformattedSectionTextArr.join(' '))}
                </Text>
              );
            })}
          </Flex>
        ) : (
          <>
            <Flex
              marginTop="48px"
              alignSelf="center"
              h="98px"
              w="98px"
              backgroundColor="#F5F5F5"
              borderRadius="50%"
              className="builder__section-email-shownotes-circle-bg"
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                color="#d0d0d0"
                h="40px"
                w="40px"
                className="builder__section-email-shownotes-edit-icon"
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
              className="builder__section-email-shownotes-preview-text"
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

export default EmailPreview;
