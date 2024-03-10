import { BASE_API_URL } from "../../config/app";
import { createGroupChat } from "../../reduxtoolkit/chatSlice";

export const createGroup = async (token, data, dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/chats/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    console.log("group created", resData);
    dispatch(createGroupChat(resData));
  } catch (error) {
    console.log(error);
  }
};
