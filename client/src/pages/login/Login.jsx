import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  Link,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Link as routerLink, useNavigate } from 'react-router-dom';
import { userLogin } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.username !== '' || newUser.password !== '') {
      setIsLoading(true);
      try {
        const res = await userLogin(newUser);
        dispatch(setUser(res.data));
        toast({
          title: 'Login Successful',
          status: 'success',
          position: 'top',
          variant: 'left-accent',
          duration: '3000',
          isClosable: true,
        });
        setIsLoading(false);
        if (res.data.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/barber');
        }
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
    } else {
      toast({
        title: 'All Feilds Are Required..!!',
        status: 'warning',
        position: 'top',
        variant: 'left-accent',
        duration: '3000',
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={{ base: '90vh', lg: '100vh' }}
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>Sign In To Your Account</Heading>
        </Stack>
        <Box rounded='lg' bg={useColorModeValue('white', 'gray.700')} boxShadow='lg' p={8}>
          <Stack spacing={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={handleChange}
                  type='text'
                  name='username'
                  value={newUser.username}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={newUser.password}
                  />
                  <InputRightElement h='full'>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Box mt={5}>
                Don't have an Account?{' '}
                <Link color='blue.400' to='/register' as={routerLink}>
                  Signup
                </Link>
              </Box>
              <Button isLoading={isLoading} w='100%' type='submit' mt={5} colorScheme='orange'>
                Login
              </Button>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
