import axios from 'axios';

const authApi = axios.create({
  // baseURL: 'http://localhost:5000/api/v1/auth',
  baseURL: 'https://vantastic-server.onrender.com/api/v1/auth',
});

export const userLogin = async (user) => {
  return await authApi.post('/login', user);
};

export const userRegister = async (user) => {
  return await authApi.post('/register', user);
};
