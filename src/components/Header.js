import { Flex } from "@chakra-ui/react";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      <Flex justify="flex-start" backgroundColor="#fff">
        {/* Wire up the navigation */}
        <Nav />
      </Flex>
    </>
  );
};

export default Header;
