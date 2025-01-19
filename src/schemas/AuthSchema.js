import * as yup from 'yup'

export const applicantSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'First name can only contain letters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Last name can only contain letters')
    .required('Last name is required'),
  skills: yup
    .array()
    .of(yup.string())
    .default([])
})

export const recruiterSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  companyName: yup
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
  industry: yup
    .string()
    .required('Industry is required')
})

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
})
