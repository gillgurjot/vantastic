import { Accordion, Button, Flex, FormControl, Input, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { fetchAllJobs } from '../../../api/jobApi';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../../../redux/slices/jobSlice';
import JobsAccordion from './JobsAccordion';
import { getJobsByTime } from '../../../utils/extraFeatures';

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
        position: 'top',
        variant: 'left-accent',
        duration: '3000',
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      try {
        const res = await fetchAllJobs(date, authToken);
        dispatch(setJobs(getJobsByTime(res.data)));
        toast({
          title: 'Jobs Fetched Successfully',
          status: 'success',
          position: 'top',
          variant: 'left-accent',
          duration: '3000',
          isClosable: true,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: error.response.data,
          status: 'error',
          position: 'top',
          variant: 'left-accent',
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
        <Flex alignItems='center' justifyContent='center' direction='column' mt={5}>
          <Text fontSize='30px' fontFamily='heading' fontWeight='700'>
            Total Bookings: {jobs.length}
          </Text>
          <Accordion mt={5} allowToggle>
            {jobs?.map((job) => (
              <JobsAccordion key={job._id} job={job} />
            ))}
          </Accordion>
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
