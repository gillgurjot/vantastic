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
import React, { useRef, useState } from "react";
import { updateJob } from "../../../api/jobApi";
import { useDispatch, useSelector } from "react-redux";
import { editJob } from "../../../redux/slices/jobSlice";
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

const EditModal = ({ children, job }) => {
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

  const initialRef = useRef(null);

  const handleSubmit = async (e) => {
    const { barber, name, address, phone, service, date, from, to, price } =
      newJob;
    e.preventDefault();
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
        const res = await updateJob(job._id, newJob, authToken);
        toast({
          title: "Job Updated",
          status: "success",
          variant: "left-accent",
          position: "top",
          duration: "3000",
          isClosable: true,
        });
        dispatch(editJob(res.data));
        setIsLoading(false);
        onClose();
      } catch (error) {
        toast({
          title: error.response.data,
          status: "error",
          variant: "left-accent",
          position: "top",
          duration: "3000",
          isClosable: true,
        });
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const selectedServices = job.service
    .split(", ")
    .map((service) => ({ value: service, label: service }));

  const handleClick = () => {
    onOpen();
    // Initialize the state with the current job details
    setNewJob({
      ...job,
      barber: job.barber.username,
      price: job.price.$numberDecimal,
    });
  };

  return (
    <>
      <span onClick={handleClick}>{children}</span>
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
          <ModalHeader fontSize="26px">Update a Job</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Barber</FormLabel>
                <Select
                  defaultValue={{
                    value: job.barber.username,
                    label: job.barber.fullName,
                  }} // Set the value for the selected barber
                  ref={initialRef}
                  onChange={(e) => handleSelectChange(e, "barber")} // Use handleSelectChange to update the state
                  name="barber"
                  options={barbers.map((barber) => ({
                    value: barber.username, // The value will be the barber's username
                    label: barber.fullName, // The label will be the barber's full name
                  }))}
                  placeholder="Select Barber"
                  isClearable // Allow clearing the selected barber
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
                  defaultValue={selectedServices}
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
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
