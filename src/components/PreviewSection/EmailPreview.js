import { useContext } from "react";
import { Flex, Icon, Text, Spacer, Image } from "@chakra-ui/react";
import { IoChevronBackSharp } from "react-icons/io5";
import { FiMail, FiTrash, FiEdit } from "react-icons/fi";
import { BiArchiveIn, BiDotsHorizontalRounded } from "react-icons/bi";
import { AiFillPlusCircle, AiFillPlayCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BuilderContext } from "../../context/BuilderContext";

const EmailPreview = () => {
  // reference context data store to access textarea user value to render to screen
  const [builderSectionTextareaList] = useContext(BuilderContext);

  const hasEmptyBuilderSectionTextareaValues = builderSectionTextareaList.every(
    (builderSectionTextarea) => builderSectionTextarea.text === ""
  );
  return (
    <Flex
      justify="flex-start"
      w="380px"
      border="1px solid #888"
      borderRadius="4px"
      className="builder__section-email-preview"
      position="relative"
      marginTop="4.5rem"
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
            New episode: Episode Title
          </Text>
          <Icon
            marginLeft="8px"
            className="builder__section-email-add-icon"
            h="23px"
            w="23px"
            as={AiFillPlusCircle}
            fill="#6E41E2"
          />
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
          >
            <Text
              fontWeight="500"
              fontSize="14px"
              lineHeight="16.8px"
              fontFamily="Helvetica Neue, Roboto, san-serif"
              className="builder__section-email-sender-name"
            >
              Podcast Name
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
          Episode Title
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
        width="348px"
        height="104px"
        boxShadow="0 2px 5px 0 rgb(0 0 0 / 15%)"
      >
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
          >
            <Icon
              h="23px"
              w="23px"
              className="builder__section-podcast-add-icon"
              as={AiFillPlusCircle}
              fill="#6E41E2"
            />
          </Flex>
        </Flex>

        <Flex
          direction="column"
          className="builder__section-podcast-controls-container"
          justifyContent="center"
          marginLeft="-16px"
        >
          <Flex
            alignItems="center"
            className="builder__section-podcast-controls-content"
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
              h="46.53px"
              className="builder__section-email-podcast-module-img"
              src="/assets/audio-waves.svg"
              alt="audio wave"
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
              return (
                <Text
                  display={!section.isVisible ? "none" : ""}
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
                  {section?.text}
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
