import { BASE_API_URL } from "../../config/app";
import { getUserChat } from "../../reduxtoolkit/chatSlice";

export const getAllUserChat = async (token, dispatch) => {
  const res = await fetch(`${BASE_API_URL}/api/chats/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await res.json();
  console.log("all chat of user", resData);
  dispatch(getUserChat(resData));
};
