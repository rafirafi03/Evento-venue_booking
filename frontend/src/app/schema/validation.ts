import * as Yup from 'yup';

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


export const editProfileSchema = Yup.object().shape({
  userName: Yup.string().required('Last Name is required'),
  phone: Yup.string()
  .required('Phone number is required')
  .matches(/^[0-9]+$/, 'Phone number must be a number')
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Phone number must be at most 15 digits'), 
});  

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