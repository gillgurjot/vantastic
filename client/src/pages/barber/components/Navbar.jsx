import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { removeAllJobs } from "../../../redux/slices/jobSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Flex
      color="white"
      w="100%"
      h="10vh"
      bgColor="blue.500"
      alignItems="center"
      justifyContent="space-between"
      px={{ base: 5, md: 10 }}
    >
      <Text fontSize={{ base: "20px", md: "30px" }} fontWeight="700">
        Vantastic Barber
      </Text>
      <Flex alignItems="center">
        <Button
          size={{ base: "sm", md: "md" }}
          onClick={() => {
            dispatch(removeUser());
            dispatch(removeAllJobs());
            navigate("/");
          }}
          rightIcon={<FiLogOut />}
          colorScheme="orange"
          mr={5}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
