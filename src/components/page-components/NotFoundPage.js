import { NavLink } from "react-router-dom";
import { Flex, Container, Text, Button, Heading } from "@chakra-ui/react";

const NotFoundPage = () => (
  <Container m="4" p="4">
    <Flex>
      <Heading isTruncated as="h2" fontSize="38px" fontWeight="800">
        Page Not Found
      </Heading>
    </Flex>
    <Flex>
      <Text mt="4" fontFamily="Inter, sans-serif" color="#111111">
        Hmm, sorry about that. We can&apos;t find the page you&apos;re looking
        for.
      </Text>
    </Flex>
    <Flex>
      <NavLink to="/">
        <Button
          _hover={{
            opacity: ".8",
          }}
          mt={4}
          bgColor="#111111"
          borderRadius="4px"
        >
          <Text color="#ffffff" fontSize="16px">
            Back to home
          </Text>
        </Button>
      </NavLink>
    </Flex>
  </Container>
);

export default NotFoundPage;
