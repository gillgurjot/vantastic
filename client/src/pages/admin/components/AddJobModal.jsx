import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { addJob } from "../../../api/jobApi";
import { useDispatch, useSelector } from "react-redux";
import { addNewJob } from "../../../redux/slices/jobSlice";
import Select from "react-select";
import serviceOptions from "../../../data/services.json";

const initialState = {
  barber: "",
  name: "",
  address: "",
  phone: "",
  service: "",
  date: "",
  from: "",
  to: "",
  price: "",
};

const AddJobModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newJob, setNewJob] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useSelector((state) => state.user.value.authToken);
  const barbers = useSelector((state) => state.barbers.value);

  const toast = useToast();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions, fieldName) => {
    if (fieldName === "service") {
      // Convert the array of selected options to a string (comma-separated)
      const selectedServices = selectedOptions
        .map((option) => option.value)
        .join(", ");
      setNewJob({ ...newJob, [fieldName]: selectedServices });
    } else {
      // For single-select fields (like barber), just set the value
      setNewJob({ ...newJob, [fieldName]: selectedOptions.value });
    }
  };

  const initialRef = React.useRef(null);
  const selectRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { barber, name, address, phone, service, date, from, to, price } =
      newJob;
    if (
      barber == "" ||
      name == "" ||
      address == "" ||
      phone == "" ||
      service == "" ||
      date == "" ||
      from == "" ||
      to == "" ||
      price == ""
    ) {
      toast({
        title: "All Fields Are Required..!!",
        status: "warning",
        variant: "left-accent",
        position: "top",
        duration: "3000",
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      try {
        const res = await addJob(newJob, authToken);
        dispatch(addNewJob(res.data));
        toast({
          title: "New job Added",
          status: "success",
          variant: "left-accent",
          position: "top",
          duration: "3000",
          isClosable: true,
        });
        selectRef.current.clearValue();
        setNewJob(initialState);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: error.response.data,
          status: "error",
          variant: "left-accent",
          position: "top",
          duration: "3000",
          isClosable: true,
        });
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal
        scrollBehavior="inside"
        isCentered
        initialFocusRef={initialRef}
        finalFocus
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="26px">Add a Job</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Barber</FormLabel>
                <Select
                  options={barbers.map((barber) => ({
                    value: barber.username,
                    label: barber.fullName,
                  }))}
                  onChange={(e) => handleSelectChange(e, "barber")}
                  placeholder="Select Barber"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  required
                  onChange={handleChange}
                  name="name"
                  value={newJob.name}
                  placeholder="Name"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={newJob.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phone"
                  value={newJob.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone Number"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Services</FormLabel>
                <Select
                  isMulti
                  options={serviceOptions}
                  ref={selectRef}
                  onChange={(e) => handleSelectChange(e, "service")}
                  closeMenuOnSelect={false}
                  placeholder="Select Services"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  value={newJob.price}
                  onChange={handleChange}
                  type="number"
                  placeholder="Price"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Date</FormLabel>
                <Input
                  name="date"
                  value={newJob.date}
                  onChange={handleChange}
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>From</FormLabel>
                <Input
                  name="from"
                  value={newJob.from}
                  onChange={handleChange}
                  placeholder="Select Date and Time"
                  size="md"
                  type="time"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>To</FormLabel>
                <Input
                  name="to"
                  value={newJob.to}
                  onChange={handleChange}
                  placeholder="Select Date and Time"
                  size="md"
                  type="time"
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              onClick={handleSubmit}
              w="100%"
              type="submit"
              colorScheme="orange"
              mr={3}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddJobModal;
