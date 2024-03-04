import * as Yup from "yup";

export const signUpSchema = Yup.object({
  fullName: Yup.string().min(5).max(15).required("minimum length 5"),
  email: Yup.string().email().required("enter a valid email"),
  password: Yup.string().min(5).max(10).required("between 5 to 10 character"),
});
