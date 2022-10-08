import * as yup from "yup";
export const validationSchema = yup.object({
  name: yup
    .string("Enter user full name")
    .min(3, "User name should be atleaste 3 letters")
    .required("User name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
