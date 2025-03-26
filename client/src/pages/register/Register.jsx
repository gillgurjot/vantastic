import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../api/authApi";
import { useSelector } from "react-redux";

const Register = () => {
  const initUser = { username: "", fullName: "", password: "", cPassword: "" };
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState(initUser);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.username || !user.isAdmin) {
      navigate("/");
    } else {
      return;
    }
  }, [user, navigate]);

  const toast = useToast();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, fullName, password, cPassword } = newUser;
    if (password === cPassword) {
      if (username == "" || password == "") {
        toast({
          title: "All Fields Are Required..!!",
          status: "warning",
          position: "top",
          duration: "3000",
          isClosable: true,
        });
      } else {
        setIsLoading(true);
        try {
          const res = await userRegister({ username, fullName, password });
          setIsLoading(false);
          toast({
            title: `${res.data.fullName} Registered Successfully`,
            status: "success",
            position: "top",
            variant: "left-accent",
            duration: "3000",
            isClosable: true,
          });
          setNewUser(initUser);
        } catch (error) {
          toast({
            title: error.response.data,
            status: "error",
            position: "top",
            variant: "left-accent",
            duration: "3000",
            isClosable: true,
          });
          setIsLoading(false);
          console.log(error);
        }
      }
    } else {
      toast({
        title: "Passwords Dont Match..!!",
        status: "error",
        position: "top",
        variant: "left-accent",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  const handleBack = () => {
    navigate("/admin");
  };

  return (
    <Flex
      minH={{ base: "90vh", lg: "100vh" }}
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align="center">
          <Heading fontSize={{ base: "3xl", md: "4xl" }}>
            Create a New Account
          </Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  value={newUser.fullName}
                />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  value={newUser.username}
                />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={newUser.password}
                  />
                  <InputRightElement h="full">
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl mt={2}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    name="cPassword"
                    value={newUser.cPassword}
                  />
                  <InputRightElement h="full">
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                isLoading={isLoading}
                w="100%"
                type="submit"
                mt={5}
                colorScheme="orange"
              >
                Signup
              </Button>
              <Button w="100%" mt={5} colorScheme="orange" onClick={handleBack}>
                Back to Home
              </Button>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
