import { useDispatch } from "react-redux";
import { getMessages } from "../../reduxtoolkit/messageSlice";
import { BASE_API_URL } from "../../config/app";

export const getAllMessages = async (dispatch, currentChat, tokenFromLocal) => {
  const res = await fetch(
    `${BASE_API_URL}/api/messages/chat/${currentChat?.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenFromLocal}`,
      },
    }
  );
  const resData = await res.json();
  dispatch(getMessages(resData));
};
