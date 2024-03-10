import { BASE_API_URL } from "../config/app";
import { currentUser, signIn } from "../reduxtoolkit/authSlice";
const getCurrentUser = async (tokenFromLocal, navigate, dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/users/profile`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenFromLocal}`,
      },
    });
    const resData = await res.json();
    if (resData.status != 403) {
      dispatch(signIn(tokenFromLocal));
      dispatch(currentUser(resData));
    } else {
      navigate("/signin");
    }
  } catch (error) {
    console.log("server error", error);
    navigate("/signin");
  }
};

export default getCurrentUser;
