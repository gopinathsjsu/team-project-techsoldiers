import * as yup from 'yup';
import { regex } from 'constants/regex'

// This is demo Validation using yup. We will change according to our need
export const LoginValidation = yup.object().shape({
    userId: yup.string()
        .email('Enter Valid Email address')
        .nullable(false)
        .required('Email is required'),
    password: yup.string()
        .nullable(true)
        .required('Password is required')
})

export const RegistrationValidation = yup.object().shape({
    userId: yup.string()
        .email('Enter Valid Email address')
        .nullable(false)
        .required('Email is required'),
    password: yup.string()
        .nullable(false)
        .required('Password is required')
})