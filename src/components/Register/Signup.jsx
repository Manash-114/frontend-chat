import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, register } from "../../Redux/Auth/Action";
import { signUp } from "../../reduxtoolkit/authSlice";
import { BASE_API_URL } from "../../config/app";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/inputdata";
const initialValues = {
  fullName: "",
  email: "",
  password: "",
};
const Signup = () => {
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (value, action) => {
        console.log(value);
        handleSignUp(value);
        action.resetForm();
      },
    });

  const auth = useSelector((store) => store.auth);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [alreadyHaveanAccountSnackbar, setAlreadyHaveanAccountSnackbar] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    fetch(`${BASE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.auth === false) {
          setAlreadyHaveanAccountSnackbar(true);
        } else setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log(err);
        setOpenErrorSnackbar(true);
      });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleErrorSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };

  // useEffect(() => {
  //   if (token) dispatch(currentUser(token));
  // }, [token]);

  // useEffect(() => {
  //   if (auth.reqUser) {
  //     navigate("/");
  //   }
  // }, [auth.reqUser]);

  const tokenFromLocal = localStorage.getItem("token");
  useEffect(() => {
    if (tokenFromLocal) navigate("/");
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col justify-center min-h-screen items-center">
          <div className="w-[30%] p-10 shadow-md bg-white">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <p className="mb-2">User Name</p>
                <input
                  placeholder="Enter your name"
                  type="text"
                  name="fullName"
                  autoComplete="off"
                  className="py-2 px-2 outline-none w-full rounded-md border-2 border-green-600"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.fullName && touched.fullName ? (
                  <p className="text-red-600">{errors.fullName}</p>
                ) : null}
              </div>

              <div>
                <p className="mb-2">Email</p>
                <input
                  placeholder="Enter your email"
                  type="text"
                  name="email"
                  autoComplete="off"
                  className="py-2 px-2 outline-none w-full rounded-md border-2 border-green-600"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="text-red-600">{errors.email}</p>
                ) : null}
              </div>

              <div>
                <p className="mb-2">Password</p>
                <input
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  autoComplete="off"
                  className="py-2 px-2 outline-none w-full rounded-md border-2 border-green-600"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="text-red-600">{errors.password}</p>
                ) : null}
              </div>
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ bgcolor: "green", padding: "0.5rem 0rem" }}
                  className="w-full bg-green-600"
                >
                  SignUp
                </Button>
              </div>
            </form>
            <div className="flex space-x-3 items-center mt-5">
              <p className="m-0">Already have an Account?</p>
              <Button
                variant="text"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Signin
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Your account is successfully created. Sign in to continue
        </Alert>
      </Snackbar>

      <Snackbar
        open={alreadyHaveanAccountSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setAlreadyHaveanAccountSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setAlreadyHaveanAccountSnackbar(false);
          }}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Already have an account with given email
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert
          onClose={handleErrorSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Server error
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;
