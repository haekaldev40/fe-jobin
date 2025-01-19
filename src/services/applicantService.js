import axios from "axios";

const BASE_URL = 'http://localhost:5000/api';
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const applicantServices = {
    getAllJobs: async () => {
        const response = await api.get('/jobs/public')
        return response.data;
    },
    getJobByPublicId: async (id) => {
        const response = await api.get(`/jobs/public/${id}`)
        return response.data;
    },

    getCompanyByName: async (companyName) => {
        const response = await api.get(`/recruiter/companies/${companyName}`)
        return response.data
    }
}