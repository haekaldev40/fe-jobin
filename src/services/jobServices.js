import useAuthStore from "@/store/AuthStore";
import axios from "axios";

const BASE_URL = 'http://localhost:5000/api';
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export const jobServices = {
    getJobs: async () => {
        const response = await api.get('/jobs');
        console.log('API Response:', response.data);
        return response.data;
    },

    getJobById: async (id) => {
        const response = await api.get(`/jobs/${id}`);
        return response.data;
    },

    createJob: async (jobData) => {
        const response = await api.post('/jobs', jobData);
        return response.data;
    },

    updateJob: async ({ id, data }) => {
        const response = await api.put(`/jobs/${id}`, data);
        return response.data;
      },

    deleteJob: async (id) => {
        const response = await api.delete(`/jobs/${id}`); 
        return response.data;
    }
    
}
