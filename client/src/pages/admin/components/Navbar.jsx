import React from 'react';
import { Button, Flex, IconButton, Text } from '@chakra-ui/react';
import AddJobModal from './AddJobModal';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { removeAllJobs } from '../../../redux/slices/jobSlice';
import { useRef } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buttonRef = useRef();

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'q' || e.key === 'Q')) {
      e.preventDefault();
      buttonRef.current.click();
    }
    return;
  });

  const handleClick = () => {
    dispatch(removeUser());
    dispatch(removeAllJobs());
    navigate('/');
  };

  return (
    <Flex
      color='white'
      w='100%'
      h='10vh'
      bgColor='blue.500'
      alignItems='center'
      justifyContent='space-between'
      px={{ base: 5, md: 10 }}
    >
      <Text fontSize={{ base: '20px', md: '30px' }} fontWeight='700'>
        Vantastic Barber
      </Text>
      <Flex alignItems='center'>
        <AddJobModal>
          <Button ref={buttonRef} colorScheme='orange' mr={5}>
            Add Job
          </Button>
        </AddJobModal>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          icon={<FiLogOut />}
          onClick={handleClick}
          rounded='full'
          colorScheme='orange'
        />
        <Button onClick={handleClick} colorScheme='orange' display={{ base: 'none', md: 'flex' }}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
