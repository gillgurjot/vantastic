import React from "react";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import AddJobModal from "./AddJobModal";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../redux/slices/userSlice";
import { setbarbers } from "../../../redux/slices/barbersSlice";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { removeAllJobs } from "../../../redux/slices/jobSlice";
import { useRef } from "react";
import { fetchAllUsers } from "../../../api/authApi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.user.value.authToken);
  const users = useSelector((state) => state.barbers.value);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchAllUsers(authToken);
        dispatch(setbarbers(response.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [authToken]);

  const buttonRef = useRef();

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && (e.key === "q" || e.key === "Q")) {
      e.preventDefault();
      buttonRef.current.click();
    }
    return;
  });

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(removeAllJobs());
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/admin/register");
  };

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
          onClick={handleRegister}
          colorScheme="orange"
          display={{ base: "none", md: "flex" }}
          mr={5}
        >
          Register User
        </Button>
        <AddJobModal>
          <Button ref={buttonRef} colorScheme="orange" mr={5}>
            Add Job
          </Button>
        </AddJobModal>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="orange"
            display={{ base: "flex", md: "none" }}
          >
            <FiMenu />
          </MenuButton>
          <MenuList color={"black"}>
            <MenuItem onClick={handleRegister}>Register User</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
        <Button
          onClick={handleLogout}
          colorScheme="orange"
          display={{ base: "none", md: "flex" }}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
