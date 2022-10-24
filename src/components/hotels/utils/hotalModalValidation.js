import * as yup from "yup";
export const hotalModalValidation = yup.object({
  hotelName: yup
    .string("Enter Hotel full name")
    .min(3, "Hotel name should be at least 3 letters")
    .required("Hotel name is required"),
  SOAmail: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  adminNumber: yup
    .string("Please add admin number")
    .min(8, "Admin number should have length of 8 numbers at least")
    .required("Please add admin number"),
  appleMapLink: yup
    .string("Please add apple map link")
    .required("Please provide location link for apple mobile"),
  googleMapLink: yup
    .string("Please add google map link")
    .required("Please provide location link of google map"),
  hotelLogo: yup
    .string("Please add google map link")
    .required("Please provide location link of google map"),
});
