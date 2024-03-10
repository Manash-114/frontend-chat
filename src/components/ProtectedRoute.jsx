import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../apicalls/getCurrentUser";

const ProtectedRoute = ({ Component }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no token ");
      navigate("/signin");
    } else {
      getCurrentUser(token, navigate, dispatch);
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
