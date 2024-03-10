//createmessage

import { BASE_API_URL } from "../../config/app";
import { createNewMessage } from "../../reduxtoolkit/messageSlice";

export const createMessage = async (
  dispatch,
  currentUserId,
  tokenFromLocal,
  chatId,
  content
) => {
  console.log("from create message", currentUserId);
  const res = await fetch(`${BASE_API_URL}/api/messages/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenFromLocal}`,
    },
    body: JSON.stringify({
      chatId: chatId,
      content: content,
    }),
  });

  const resData = await res.json();
  dispatch(createNewMessage(resData));
};
