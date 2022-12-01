import axios from 'axios';

const jobApi = axios.create({
  baseURL: import.meta.env.VITE_JOB_URL,
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
