import { Button, Flex, FormControl, Input, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { fetchAllJobs } from '../../../api/jobApi';
import JobCard from './JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../../../redux/slices/jobSlice';

const ViewJobs = () => {
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const jobs = useSelector((state) => state.jobs.value);
  const authToken = useSelector((state) => state.user.value.authToken);

  const dispatch = useDispatch();
  const toast = useToast();

  const handleChange = async (e) => {
    e.preventDefault();
    if (date == '') {
      toast({
        title: 'Please Select a Date',
        status: 'warning',
        variant: 'left-accent',
        position: 'top',
        duration: '3000',
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      try {
        const res = await fetchAllJobs(date, authToken);
        dispatch(setJobs(res.data));
        toast({
          title: 'Jobs Fetched Successfully',
          status: 'success',
          variant: 'left-accent',
          position: 'top',
          duration: '3000',
          isClosable: true,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: error.response.data,
          status: 'error',
          variant: 'left-accent',
          position: 'top',
          duration: '3000',
          isClosable: true,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <Flex direction='column' w='100%' justifyContent='center' alignItems='center'>
      <Flex w='100%' justifyContent='center' alignItems='center'>
        <FormControl mt={5} w='50%'>
          <Text fontSize={{ base: '18px', md: '20px' }} mb={2} letterSpacing={2}>
            Select Date:
          </Text>
          <Input onChange={(e) => setDate(e.target.value)} type='date' />
        </FormControl>
        <Button
          isLoading={isLoading}
          onClick={handleChange}
          colorScheme='orange'
          alignSelf='end'
          ml={5}
        >
          Get Bookings
        </Button>
      </Flex>
      {jobs.length !== 0 ? (
        <Flex mb={5} alignItems='center' justifyContent='center' direction='column' mt={8}>
          <Text fontSize='30px' fontFamily='heading' fontWeight='700'>
            Total Bookings: {jobs.length}
          </Text>
          <SimpleGrid mt={5} gap={5} columns={{ base: 1, md: 2, '2xl': 3 }}>
            {jobs && jobs?.map((job) => <JobCard key={job._id} job={job} />)}
          </SimpleGrid>
        </Flex>
      ) : (
        <Text mt={8} fontSize='18px'>
          No bookings available for the selected date
        </Text>
      )}
    </Flex>
  );
};

export default ViewJobs;
