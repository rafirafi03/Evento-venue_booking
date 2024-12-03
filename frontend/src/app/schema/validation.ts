import { DateValue } from '@nextui-org/react';
import * as Yup from 'yup';
import * as z from 'zod';


export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface OtpFormInputs {
  otp: string;
}


export const otpSchema = Yup.object().shape({
  otp: Yup.string()
   .required('OTP is required')
   .matches(/^[0-9]+$/, 'Phone number must be a number')
   .length(6, 'OTP must be exactly 6 digits') 
  });

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export interface SignUpFormInputs {
  userName: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}

export const signUpSchema = Yup.object().shape({
  userName: Yup.string().required('User Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
  .required('Phone number is required')
  .matches(/^[0-9]+$/, 'Phone number must be a number')
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Phone number must be at most 15 digits'), 
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
});  


export interface ForgotPasswordFormInputs {
  email: string;
}

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export interface NewPasswordFormInputs {
  newPassword:string;
  confirmPassword:string;
}

export const NewPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm Password is required'),
});


export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name can't be longer than 50 characters" }),
});
type EditProfileData = z.infer<typeof editProfileSchema>;

export interface EditProfileProps {
  userDetails: EditProfileData;
  onSubmit: (data: EditProfileData) => Promise<void>;
}


export interface editProfileFormInputs{
  userName:string,
  email:string,
  phone:string
}

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm Password is required'),
});


export interface ChangePasswordFormInput {
  password:string;
  newPassword:string;
  confirmPassword:string;
}

export interface OfferInputs {
    name: string;
    percentage: number;
    validity: number;
}

export const offerValidationSchema = Yup.object({
  name: Yup.string().required('Offer name is required'),
  percentage: Yup.number()
    .min(1, 'Percentage must be at least 1')
    .max(100, 'Percentage cannot exceed 100')
    .required('Offer percentage is required'),
  validity: Yup.number()
    .min(1, 'Validity must be at least 1 day')
    .required('Offer validity is required'),
});


export const venueValidationSchema = Yup.object({
  name: Yup.string()
    .required('Venue name is required')
    .min(3, 'Venue name must be at least 3 characters long'),
  type: Yup.string()
    .required('Venue type is required')
    .oneOf(['conference', 'wedding', 'party', 'meeting'], 'Invalid venue type'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
  capacity: Yup.number()
    .required('Capacity is required')
    .min(1, 'Capacity must be at least 1')
    .max(5000, 'Capacity cannot exceed 5000'),
  address: Yup.string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters long'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters long'),
  state: Yup.string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters long'),
});

export const validateDates = (start: DateValue, end: DateValue) => {
  // Convert DateValue to JavaScript Date for comparison
  const startDate = new Date(start.year, start.month - 1, start.day);
  const endDate = new Date(end.year, end.month - 1, end.day);

  // Check if start date is after end date
  if (startDate > endDate) {
    return false;
  }

  return true;
};

