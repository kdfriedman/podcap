import { useRef, useContext } from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Icon,
  Image,
} from "@chakra-ui/react";
import readInputFile from "../../util/readInputFile";
import { IoMdCloudUpload } from "react-icons/io";
import { PreviewContext } from "../../context/PreviewContext";

const AddPodcastInfo = ({ isOpen, onClose }) => {
  const [currentImage, setImage] = useContext(PreviewContext);
  const [fileToBase64, updateBase64] = useContext(PreviewContext);
  const [formInputText, updateFormInputText] = useContext(PreviewContext);

  // use to apply focus to  1st input on modal open
  const initialRef = useRef();

  const handleImageFileChange = (e) => {
    // check if file has length to determine if file has been selected or canceled
    if (e.target.files.length === 0) return;

    // parse file from input
    const file = e.target.files[0];

    // set image state with uploaded image file
    setImage(file);

    // async wrapper to handle async readURL function
    (async () => {
      try {
        // read file
        const url = await readInputFile(file);
        // update state with new image base64 string
        updateBase64(url);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <>
      <Modal
        className="builder__section-modal"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay className="builder__section-modal-overlay" />
        <ModalContent
          className="builder__section-modal-content"
          maxW="530px"
          maxH="577px"
        >
          <ModalHeader
            className="builder__section-modal-header"
            mt="25px"
            fontSize="24px"
            fontWeight="800"
            fontFamily="Inter, san-serif"
            display="flex"
            justifyContent="center"
          >
            Your Podcast Info
          </ModalHeader>
          <ModalCloseButton className="builder__section-modal-close-btn" />
          <ModalBody className="builder__section-modal-body" pb={6}>
            <FormControl className="builder__section-modal-form-control">
              <FormLabel
                className="builder__section-modal-form-label"
                fontWeight="700"
                fontSize="15px"
                color="#666666"
                fontFamily="Inter, san-serif"
              >
                Podcast Name
              </FormLabel>
              <Input
                className="builder__section-modal-form-input"
                h="44px"
                ref={initialRef}
                placeholder="Enter podcast name"
                _focus={{
                  border: "1px solid #773AE7",
                }}
              />
            </FormControl>

            <FormControl className="builder__section-modal-form-control" mt={4}>
              <FormLabel
                className="builder__section-modal-form-label"
                fontWeight="700"
                fontSize="15px"
                color="#666666"
                fontFamily="Inter, san-serif"
              >
                Pocast Title
              </FormLabel>
              <Input
                className="builder__section-modal-form-input"
                _focus={{
                  border: "1px solid #773AE7",
                }}
                h="44px"
                borderRadius="4px"
                placeholder="Enter podcast title"
              />
            </FormControl>

            <FormControl className="builder__section-modal-form-control" mt={4}>
              <FormLabel
                className="builder__section-modal-form-label"
                fontWeight="700"
                fontSize="15px"
                color="#666666"
                fontFamily="Inter, san-serif"
              >
                Pocast Logo
              </FormLabel>
              <FormLabel
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                className="builder__section-modal-form-label"
                w="150px"
                h="150px"
                borderRadius="4px"
                border="1px solid #C6C6C6"
              >
                {!currentImage && (
                  <Icon
                    color="#aaaaaa"
                    w="1.5rem"
                    h="1.5rem"
                    className="builder__section-modal-form-upload-icon"
                    as={IoMdCloudUpload}
                  />
                )}
                {!currentImage && (
                  <Text
                    color="#aaaaaa"
                    fontSize="17px"
                    fontFamily="Inter, san-serif"
                    textAlign="center"
                    fontWeight="400"
                  >
                    Upload Image
                  </Text>
                )}
                {fileToBase64 && (
                  <Flex
                    h="10rem"
                    className="builder__section-modal-image-container"
                  >
                    <Image
                      maxWidth="100%"
                      height="100%"
                      overflow="hidden"
                      objectFit="cover"
                      alt="podcast brand"
                      className="builder__section-modal-image-preview"
                      src={fileToBase64}
                      id="uploadedImage"
                    />
                  </Flex>
                )}
                <Input
                  className="builder__section-modal-form-input"
                  h="44px"
                  borderRadius="4px"
                  type="file"
                  display="none"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageFileChange}
                />
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter className="builder__section-modal-footer">
            <Button
              _hover={{
                opacity: ".8",
              }}
              background="transparent"
              onClick={onClose}
              color="#4D4D4D"
              fontFamily="Inter, san-serif"
              fontWeight="700"
              fontSize="16px"
            >
              CANCEL
            </Button>
            <Button
              _hover={{
                opacity: ".8",
              }}
              fontSize="16px"
              fontWeight="700"
              fontFamily="Inter, san-serif"
              color="#fff"
              background="#773AE7"
              ml={3}
            >
              SAVE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPodcastInfo;
