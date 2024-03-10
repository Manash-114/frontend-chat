import { BASE_API_URL } from "../config/app";
import { updateUser } from "../reduxtoolkit/authSlice";

export const updateProfileApi = async (dispatch, data, token, setIsUpload) => {
  const res = await fetch(`${BASE_API_URL}/api/users/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  dispatch(updateUser(resData));
  setIsUpload(false);
};
