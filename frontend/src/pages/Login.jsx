import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useLogin } from "../services/auth/auth";
import { useAuthStore } from "../store/authStore";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const { toast } = useToast();

  const { setTokens } = useAuthStore();

  const { mutateAsync: login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("formdata: ", data);
    try {
      const response = await login(data);
      const { access, refresh } = response;
      setTokens({
        accessToken: access,
        refreshToken: refresh,
      });
      navigate("/posts");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "An error occurred",
        status: "error",
      });
    }
  };

  return (
    <Box
      w={{ base: "90%", md: "400px" }}
      mt={10}
      p={8}
      borderRadius="lg"
      boxShadow="5px 10px 50px 2px #0003"
      color="white"
      border={"1px"}
      borderColor={"gray.800"}
    >
      <Heading size={"lg"} mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Username</FormLabel>
            <Input
              borderColor={"gray.300"}
              type="text"
              placeholder="Enter username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              borderColor={"gray.300"}
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="cyan"
            width={"full"}
            type="submit"
            color={"black"}
          >
            Login
          </Button>
          <Button
            variant={"outline"}
            colorScheme="cyan"
            width={"full"}
            onClick={() => navigate("/register")}
          >
            Create an account
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
