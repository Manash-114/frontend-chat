import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../config/app";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, signIn } from "../../reduxtoolkit/authSlice";

const Signin = () => {
  const auth = useSelector((store) => store.auth);
  const tokenFromLocal = localStorage.getItem("token");

  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({ email: "", password: "" });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  const [errorMessage, setErrorMessage] = useState();
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const resData = await res.json();
      if (resData.message) {
        setOpenSnackbar(true);
        setErrorMessage(resData.message);
      } else {
        const token = resData.jwt;
        localStorage.setItem("token", token);
        dispatch(signIn());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.signin == true) navigate("/");
  }, [auth.signin]);
  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Email</p>
              <input
                placeholder="Enter your email"
                type="text"
                name="email"
                className="py-2 px-2 outline outline-green-600 w-full rounded-md border-1"
                onChange={handleOnchange}
                value={inputData.email}
              />
            </div>

            <div>
              <p className="mb-2">Password</p>
              <input
                placeholder="Enter your password"
                type="password"
                className="py-2 px-2 outline outline-green-600 w-full rounded-md border-1"
                onChange={handleOnchange}
                name="password"
                value={inputData.password}
              />
            </div>
            <div>
              <Button
                variant="contained"
                type="submit"
                sx={{ bgcolor: "green", padding: "0.5rem 0rem" }}
                className="w-full bg-green-600"
              >
                Signin
              </Button>
            </div>
          </form>

          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Create new Account</p>
            <Button
              variant="text"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
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
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signin;
