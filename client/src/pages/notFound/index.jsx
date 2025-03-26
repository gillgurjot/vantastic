import React from "react";
import { Box, Button, Heading, Text, Center, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Center height="100vh" bg="gray.50" mx={5}>
      <Stack spacing={6} textAlign="center">
        <Box>
          <Heading as="h1" size="2xl" color="blue.500">
            404
          </Heading>
          <Text fontSize="lg" mt={2} color="gray.600">
            Oops! The page you are looking for does not exist.
          </Text>
        </Box>

        <Button
          as={Link}
          to="/"
          size="lg"
          colorScheme="orange"
          variant="solid"
          width="full"
          mx="auto"
        >
          Go to Home
        </Button>
      </Stack>
    </Center>
  );
}

export default NotFoundPage;
