import * as yup from 'yup'

export const jobSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    requirements: yup.array().of(yup.string()).required(),
    salary: yup.string().required(),
    location: yup.string().required(),
    employmentType: yup.string().required(),
});