import { useRef, useContext, useState, useEffect } from "react";
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

const AddPodcastInfo = ({ isOpen, onClose, updateIsPodcastInfoSubmitted }) => {
  // reference context data store for form data (input text and images)
  const { currentImage, setImage } = useContext(PreviewContext);
  const { fileToBase64, updateBase64 } = useContext(PreviewContext);
  const { setPodcastInfoSubmitCount } = useContext(PreviewContext);
  const { formInputText, updateFormInputText } = useContext(PreviewContext);
  const [podcastNameInput, podcastTitleInput] = formInputText;

  // error msg local state
  const [formErrorMsg, updateFormErrorMsgState] = useState(null);

  // use to apply focus to  1st input on modal open
  const initialRef = useRef();

  // read image file asynchronously
  useEffect(() => {
    const loadImageUpload = async () => {
      try {
        // read file
        const url = await readInputFile(currentImage);

        updateBase64(url);

        // clear err msg state
        updateFormErrorMsgState(null);
      } catch (err) {
        console.error(err);
      }
    };

    if (currentImage) {
      loadImageUpload();
    }
  }, [currentImage, updateBase64]);

  // reset form data and all errors
  const resetForm = () => {
    // clear form inputs
    updateFormInputText((formInputList) => {
      const copiedFormInputList = [...formInputList];
      return copiedFormInputList.map((formInput) => {
        if (formInput.text !== "") {
          formInput.text = "";
        }
        return formInput;
      });
    });
    // clear image upload (base 64 string and image file) data
    setImage(null);
    updateBase64(null);
    // clear err msg state
    return updateFormErrorMsgState(null);
  };

  const closeModal = (isSubmitEvent) => {
    if (!currentImage) {
      // clear form data and errors
      resetForm();
      // close modal
      return onClose();
    }

    // check if argument passed in is submit event, if not clear form, including image file
    if (!isSubmitEvent) {
      // clear image data from context
      setImage(null);
      updateBase64(null);

      // clear form data and errors
      resetForm();
      // close modal
      return onClose();
    }
    // if image is set and form has been submitted, close modal
    return onClose();
  };

  const handleInputChange = (e) => {
    if (!e.target.closest("input") ?? !e.target.id) return;
    updateFormInputText((formInputList) => {
      const copiedFormInputList = [...formInputList];
      const activeCopiedFormInput = copiedFormInputList.find(
        (formInput) => formInput.id === e.target.id
      );
      activeCopiedFormInput.text = e.target.value;
      return copiedFormInputList;
    });
  };

  const handleImageFileChange = (e) => {
    // check if file has length to determine if file has been selected or canceled
    if (e.target.files.length === 0) return;

    // parse file from input
    const file = e.target.files[0];

    // set image state with uploaded image file
    setImage(file);
  };

  const handleAddPodcastInfoSubmit = (e) => {
    e.preventDefault();
    // check that current target is form, otherwise return
    const form = e.currentTarget.closest("form");
    if (!form) return;

    // check if image is currently present from image upload input, return if not
    if (!currentImage) {
      return updateFormErrorMsgState(
        "Please upload an image to save your info."
      );
    }

    // update parent state with submit state
    updateIsPodcastInfoSubmitted(true);

    // increment submit count to determine track if user has submitted form at least once
    setPodcastInfoSubmitCount((submitCount) => submitCount + 1);

    // close modal
    closeModal(true);
  };

  return (
    <>
      <Modal
        className="builder__section-modal"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={() => closeModal(false)}
      >
        <ModalOverlay className="builder__section-modal-overlay" />
        <ModalContent
          className="builder__section-modal-content"
          maxW="530px"
          maxH="577px"
        >
          <form
            onSubmit={handleAddPodcastInfoSubmit}
            className="builder__section-modal-form"
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
            <ModalCloseButton
              onClick={() => closeModal(false)}
              className="builder__section-modal-close-btn"
            />
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
                  onChange={handleInputChange}
                  id="podcastNameInput"
                  className="builder__section-modal-form-input"
                  h="44px"
                  ref={initialRef}
                  placeholder="Enter podcast name"
                  _focus={{
                    border: "1px solid #773AE7",
                  }}
                  minLength="1"
                  maxLength="100"
                  required
                  value={podcastNameInput.text}
                />
              </FormControl>

              <FormControl
                className="builder__section-modal-form-control"
                mt={4}
              >
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
                  onChange={handleInputChange}
                  id="podcastTitleInput"
                  className="builder__section-modal-form-input"
                  _focus={{
                    border: "1px solid #773AE7",
                  }}
                  h="44px"
                  borderRadius="4px"
                  placeholder="Enter podcast title"
                  minLength="1"
                  maxLength="100"
                  required
                  value={podcastTitleInput.text}
                />
              </FormControl>

              <FormControl
                className="builder__section-modal-form-control"
                mt={4}
              >
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
                  cursor="pointer"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  className="builder__section-modal-form-label"
                  w="150px"
                  h="150px"
                  borderRadius="4px"
                  border={
                    formErrorMsg ? "1px solid #E53E3E" : "1px solid #C6C6C6"
                  }
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
                {formErrorMsg && (
                  <Text
                    fontWeight="400"
                    fontFamily="Inter, san-serif"
                    color="#E53E3E"
                    fontSize="14px"
                  >
                    {formErrorMsg}
                  </Text>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter className="builder__section-modal-footer">
              <Button
                _hover={{
                  opacity: ".8",
                }}
                background="transparent"
                onClick={() => closeModal(false)}
                color="#4D4D4D"
                fontFamily="Inter, san-serif"
                fontWeight="700"
                fontSize="16px"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
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
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPodcastInfo;
