import { useDispatch, useSelector } from "react-redux";
import { BASE_API_URL } from "../config/app";
import { currentUser } from "../reduxtoolkit/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useGetCurrentUser = (tokenFromLocal) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);

  const getCurrentUser = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/api/users/profile`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokenFromLocal}`,
        },
      });
      const resData = await res.json();
      dispatch(currentUser(resData));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth.signin) {
      console.log("get user detail called");
      getCurrentUser(tokenFromLocal);
    } else {
      navigate("/signin");
    }
  }, []);
};

export default useGetCurrentUser;
