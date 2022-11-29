import axios from 'axios';

const jobApi = axios.create({
  // baseURL: 'http://localhost:5000/api/v1/job',
  baseURL: 'https://vantastic-server.onrender.com/api/v1/job',
});

export const addJob = async (job, token) => {
  return await jobApi.post('/', job, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const deleteJob = async (id, token) => {
  return await jobApi.delete(`/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const updateJob = async (id, job, token) => {
  return await jobApi.put(`/${id}`, job, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const fetchAllJobs = async (date, token) => {
  return await jobApi.get(`/?date=${date}`, { headers: { 'Authorization': `Bearer ${token}` } });
};
