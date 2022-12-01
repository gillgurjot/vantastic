import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { convertTime } from '../../../utils/extraFeatures';

const JobCard = ({ job }) => {
  const getDate = (date) => {
    const newDate = new Date(date).toLocaleDateString('en-AU', { dateStyle: 'long' });
    return newDate;
  };

  return (
    <Card w={{ base: 'xs', md: 'sm' }}>
      <CardBody>
        <Stack spacing='3'>
          <Heading size='md'>Barber: {job.barber.fullName}</Heading>
          <Text>Name: {job.name}</Text>
          <Text>Address: {job.address}</Text>
          <Text>Phone: {job.phone}</Text>
          <Text>Services: {job.service}</Text>
          <Text>Price: ${job.price.$numberDecimal}</Text>
          <Text>Date: {getDate(job.date)}</Text>
          <Text>
            Time: {convertTime(job.from)} to {convertTime(job.to)}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display='flex' justifyContent='space-between'>
        <EditModal job={job}>
          <Button variant='solid' colorScheme='orange'>
            Edit
          </Button>
        </EditModal>
        <DeleteModal id={job._id}>
          <Button variant='ghost' colorScheme='red'>
            Delete
          </Button>
        </DeleteModal>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
