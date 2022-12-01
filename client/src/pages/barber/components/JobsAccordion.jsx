import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { openMap, convertTime } from '../../../utils/extraFeatures';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoNavigate } from 'react-icons/io5';
import { MdOutlineStar } from 'react-icons/md';
import sendMessage from '../../../api/messageApi';

const JobsAccordion = ({ job }) => {
  const { from, to, name, address, phone, service } = job;

  const toast = useToast();

  const message =
    'Hi, Vantastic Barber is arriving soon. Help us manage our time better please be ready for your booked service. We appreciate your help.';
  const reviewMsg =
    'Thanks for booking Vantastic, Love our work? Please review us: https://g.page/r/CQW1vN_1-nmGEBM/review Any suggestions? Please email info@vantasticbarber.com.au';

  const handleGo = async () => {
    try {
      const res = await sendMessage(phone, message);
      console.log(res.status);
      toast({
        title: 'Message Sent',
        status: 'success',
        position: 'top',
        variant: 'left-accent',
        duration: '3000',
        isClosable: true,
      });
      openMap(address);
    } catch (error) {
      console.log(error.response.data);
      toast({
        title: error.response.data.message,
        status: 'error',
        position: 'top',
        variant: 'left-accent',
        duration: '3000',
        isClosable: true,
      });
    }
  };

  const handleReview = async () => {
    try {
      const res = await sendMessage(phone, reviewMsg);
      console.log(res.status);
      toast({
        title: 'Review Message Sent',
        status: 'success',
        position: 'top',
        variant: 'left-accent',
        duration: '3000',
        isClosable: true,
      });
    } catch (error) {
      console.log(error.response.data);
      toast({
        title: error.response.data.message,
        status: 'error',
        position: 'top',
        variant: 'left-accent',
        duration: '3000',
        isClosable: true,
      });
    }
  };

  return (
    <AccordionItem w={{ base: 'sm', md: '4xl' }}>
      <h2>
        <AccordionButton>
          <Box fontSize='20px' fontWeight='600' flex='1' textAlign='left'>
            {convertTime(from)} to {convertTime(to)}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel fontSize='18px' pb={4}>
        <Text>Name: {name}</Text>
        <Text mt={2}>Address: {address}</Text>
        <Text mt={2}>Phone: {phone}</Text>
        <Text mt={2}>Services: {service}</Text>
        <Flex justifyContent='space-between' mt={5}>
          <Button
            as='a'
            href={`tel:0${phone}`}
            colorScheme='orange'
            w='30%'
            rightIcon={<BsFillTelephoneFill />}
          >
            Call
          </Button>
          <Button onClick={handleReview} colorScheme='orange' w='30%' rightIcon={<MdOutlineStar />}>
            Review
          </Button>
          <Button onClick={handleGo} colorScheme='orange' w='30%' rightIcon={<IoNavigate />}>
            Go
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default JobsAccordion;
