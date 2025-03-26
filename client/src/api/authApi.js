import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
});

export const userLogin = async (user) => {
  return await authApi.post("/login", user);
};

export const userRegister = async (user) => {
  return await authApi.post("/register", user);
};

export const fetchAllUsers = async (token) => {
  return await authApi.get(`/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
