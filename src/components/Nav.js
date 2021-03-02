import { Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import CopyShownotes from "./CopyShownotes";

const Nav = () => {
  return (
    <>
      <Flex flex="1 0 auto" justify="space-between" backgroundColor="#fff">
        <NavLink to="/">Logo</NavLink>
        <CopyShownotes />
      </Flex>
    </>
  );
};

export default Nav;
