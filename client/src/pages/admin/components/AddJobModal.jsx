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
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { addJob } from '../../../api/jobApi';
import { useDispatch, useSelector } from 'react-redux';
import { addNewJob } from '../../../redux/slices/jobSlice';

const initialState = {
  barber: '',
  name: '',
  address: '',
  phone: '',
  service: '',
  date: '',
  from: '',
  to: '',
};

const AddJobModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newJob, setNewJob] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useSelector((state) => state.user.value.authToken);

  const toast = useToast();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const initialRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { barber, name, address, phone, service, date, from, to } = newJob;
    if (
      barber == '' ||
      name == '' ||
      address == '' ||
      phone == '' ||
      service == '' ||
      date == '' ||
      from == '' ||
      to == ''
    ) {
      toast({
        title: 'All Fields Are Required..!!',
        status: 'warning',
        variant: 'left-accent',
        position: 'top',
        duration: '3000',
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      try {
        const res = await addJob(newJob, authToken);
        dispatch(addNewJob(res.data));
        toast({
          title: 'New job Added',
          status: 'success',
          variant: 'left-accent',
          position: 'top',
          duration: '3000',
          isClosable: true,
        });
        setNewJob(initialState);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: error.response.data,
          status: 'error',
          variant: 'left-accent',
          position: 'top',
          duration: '3000',
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
        scrollBehavior='inside'
        isCentered
        initialFocusRef={initialRef}
        finalFocus
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='26px'>Add a Job</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Barber</FormLabel>
                <Select
                  value={newJob.barber}
                  ref={initialRef}
                  onChange={handleChange}
                  name='barber'
                  placeholder='Select Barber'
                >
                  <option value='amardeep'>Amardeep</option>
                  <option value='puneet'>Puneet</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  required
                  onChange={handleChange}
                  name='name'
                  value={newJob.name}
                  placeholder='Name'
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Address</FormLabel>
                <Input
                  name='address'
                  value={newJob.address}
                  onChange={handleChange}
                  placeholder='Address'
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name='phone'
                  value={newJob.phone}
                  onChange={handleChange}
                  type='tel'
                  placeholder='Phone Number'
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Services</FormLabel>
                <Select
                  value={newJob.service}
                  onChange={handleChange}
                  name='service'
                  placeholder='Select Service'
                >
                  <option value='Haircut'>Haircut</option>
                  <option value='Fade Haircut'>Fade Haircut</option>
                  <option value='Haircut and Beard Combo'>Haircut and Beard Combo</option>
                  <option value='Beard'>Beard</option>
                  <option value='Haircut + Beard + Face wax + Face Scrub'>
                    Haircut + Beard + Face wax + Face Scrub
                  </option>
                  <option value='Haircut + Beard + Face wax'>Haircut + Beard + Face wax</option>
                  <option value='Beard + Face wax + Face Scrub'>
                    Beard + Face wax + Face Scrub
                  </option>
                  <option value='Haircut + Face Scrub + Facewax Combo'>
                    Haircut + Face Scrub + Facewax Combo
                  </option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Date</FormLabel>
                <Input
                  name='date'
                  value={newJob.date}
                  onChange={handleChange}
                  placeholder='Select Date and Time'
                  size='md'
                  type='date'
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>From</FormLabel>
                <Input
                  name='from'
                  value={newJob.from}
                  onChange={handleChange}
                  placeholder='Select Date and Time'
                  size='md'
                  type='time'
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>To</FormLabel>
                <Input
                  name='to'
                  value={newJob.to}
                  onChange={handleChange}
                  placeholder='Select Date and Time'
                  size='md'
                  type='time'
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              onClick={handleSubmit}
              w='100%'
              type='submit'
              colorScheme='orange'
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
