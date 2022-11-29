import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { deleteJob } from '../../../api/jobApi';
import { useDispatch, useSelector } from 'react-redux';
import { removeJob } from '../../../redux/slices/jobSlice';

const DeleteModal = ({ children, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useSelector((state) => state.user.value.authToken);

  const toast = useToast();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await deleteJob(id, authToken);
      toast({
        title: 'Job Successfully Deleted',
        status: 'success',
        duration: '3000',
        isClosable: true,
        position: 'top',
      });
      dispatch(removeJob(res.data));
      setIsLoading(false);
      onClose();
    } catch (error) {
      toast({
        title: error.response.data,
        status: 'error',
        position: 'top',
        duration: '3000',
        isClosable: true,
      });
      console.log(error);
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal
        size={{ base: 'xs', md: 'md' }}
        isCentered
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='26px'>Delete Job</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody display='flex' alignItems='center'>
            <Text fontSize='18px' fontWeight='bold'>
              Are you sure?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} onClick={handleDelete} mr={3} colorScheme='red'>
              Delete
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
