import * as yup from "yup";
export const hotalModalValidation = yup.object({
  hotelName: yup
    .string("Enter Hotel full name")
    .min(3, "Hotel name should be atleaste 3 letters")
    .required("Hotel name is required"),
  SOAemail: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
