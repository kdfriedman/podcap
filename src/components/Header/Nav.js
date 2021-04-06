import { Flex, Image, Link } from "@chakra-ui/react";
import CopyShownotes from "./CopyShownotes";
import PreviewNotes from "./PreviewNotes";

const Nav = () => {
  return (
    <>
      <Flex
        className="nav"
        flex="1 0 auto"
        p="0 24px"
        justify="space-between"
        backgroundColor="#fff"
        h="64px"
        boxShadow="0 2px 4px 0 rgb(0 0 0 / 10%)"
        align="center"
        pos="relative"
      >
        <Link className="nav__logo" href="https://www.podcap.io/" isExternal>
          <Image
            maxW="140px"
            maxH="42px"
            w="100%"
            h="100%"
            src="/assets/podcap-logo.png"
            alt="Podcap Logo"
          />
        </Link>
        <CopyShownotes />
        <PreviewNotes />
      </Flex>
    </>
  );
};

export default Nav;
