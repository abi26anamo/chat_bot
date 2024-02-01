import * as yup from "yup";

// Schema for login form
export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

// Schema for reset password form
export const resetPasswordSchema = yup.object().shape({
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  cpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});
