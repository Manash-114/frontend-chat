import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_API_URL } from "../config/app";
import { getUserChat } from "../reduxtoolkit/chatSlice";

const useGetAllChats = (token) => {
  const chats = useSelector((store) => store.chat.chats);
  const [allChats, setAllChats] = useState(chats);
  const dispatch = useDispatch();

  useEffect(() => {
    getChats();
    setAllChats(allChats);
  }, []);

  useEffect(() => {
    setAllChats(chats);
  }, [chats]);

  const getChats = async () => {
    const res = await fetch(`${BASE_API_URL}/api/chats/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await res.json();
    dispatch(getUserChat(resData));
  };

  return allChats;
};

export default useGetAllChats;
