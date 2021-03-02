import { Flex, Box, Spacer } from "@chakra-ui/react";
import Header from "../Header";

const AppPage = () => {
  return (
    <>
      {/* init the header in main App Page component, independent of other components */}
      <Header />
      <Flex>
        <Box w="836px" h="100vh" bg="#fff" />
        {/* creates the vertical border in the main layout */}
        <Spacer borderLeft="1px solid #CCCCCC" />
        <Box w="700px" h="100vh" bg="#fff" />
      </Flex>
    </>
  );
};

export default AppPage;
