import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const { accessToken } = useAuthStore();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={4}
      py={12}
      textAlign="center"
      w={"100vw"}
    >
      <Heading as="h1" size="3xl" mb={4} color="cyan.300" shadow="xl">
        Simple Blog Application Built with React and Django
      </Heading>

      <Stack spacing={4} mt={16} mb={16}>
        <Text fontWeight="normal" color="gray.500">
          - Refresh Token Flow
        </Text>
        <Text fontWeight="normal" color="gray.500">
          - Protected Routes & RBAC
        </Text>
        <Text fontWeight="normal" color="gray.500">
          - Paginated Response
        </Text>
        <Text fontWeight="normal" color="gray.500">
          - Form Validation
        </Text>
      </Stack>

      <Button
        as={Link}
        to={accessToken ? "/posts" : "/login"}
        colorScheme="cyan"
        size="lg"
        shadow="md"
      >
        Get Started
      </Button>

      {/* Optional image below */}
      {/* <Image src="/jwt-diagram.png" alt="JWT Flow" mt={10} borderRadius="lg" /> */}
    </Box>
  );
};

export default Home;
