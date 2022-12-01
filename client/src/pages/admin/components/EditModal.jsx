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
import React, { useRef, useState } from 'react';
import { updateJob } from '../../../api/jobApi';
import { useDispatch, useSelector } from 'react-redux';
import { editJob } from '../../../redux/slices/jobSlice';

const initialState = {
  barber: '',
  name: '',
  address: '',
  phone: '',
  service: '',
  date: '',
  from: '',
  to: '',
  price: '',
};

const EditModal = ({ children, job }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newJob, setNewJob] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useSelector((state) => state.user.value.authToken);

  const toast = useToast();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const initialRef = useRef(null);

  const handleSubmit = async (e) => {
    const { barber, name, address, phone, service, date, from, to, price } = newJob;
    e.preventDefault();
    if (
      barber == '' ||
      name == '' ||
      address == '' ||
      phone == '' ||
      service == '' ||
      date == '' ||
      from == '' ||
      to == '' ||
      price == ''
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
        const res = await updateJob(job._id, newJob, authToken);
        toast({
          title: 'Job Updated',
          status: 'success',
          variant: 'left-accent',
          position: 'top',
          duration: '3000',
          isClosable: true,
        });
        dispatch(editJob(res.data));
        setIsLoading(false);
        onClose();
      } catch (error) {
        toast({
          title: error.response.data,
          status: 'error',
          variant: 'left-accent',
          position: 'top',
          duration: '3000',
          isClosable: true,
        });
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const handleClick = () => {
    onOpen();
    setNewJob({ ...job, barber: job.barber.username, price: job.price.$numberDecimal });
  };

  return (
    <>
      <span onClick={handleClick}>{children}</span>
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
          <ModalHeader fontSize='26px'>Update a Job</ModalHeader>
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
                <FormLabel>Price</FormLabel>
                <Input
                  name='price'
                  value={newJob.price}
                  onChange={handleChange}
                  type='number'
                  placeholder='Price'
                />
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
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
