import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import "./HomePage.css";
import {
  BsEmojiSmile,
  BsFilter,
  BsMic,
  BsThreeDotsVertical,
} from "react-icons/bs";
import ChatCard from "./ChatCard/ChatCard";
import MessageCard from "./MessageCard/MessageCard";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";
import { Button, Menu, MenuItem } from "@mui/material";
import CreateGroup from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { BASE_API_URL } from "../config/app";
import {
  currentUser,
  searchUser,
  signIn,
  signout,
} from "../reduxtoolkit/authSlice";
import useSearchUser from "../apicalls/useSearchUser";
import useGetCurrentUser from "../apicalls/useGetCurrentUser";
import useGetAllChats from "../apicalls/useGetAllChats";
import { createChat } from "../reduxtoolkit/chatSlice";
import { createNewMessage, getMessages } from "../reduxtoolkit/messageSlice";

const HomePage = () => {
  const auth = useSelector((store) => store.auth);
  const message = useSelector((store) => store.message);
  const navigate = useNavigate();
  const tokenFromLocal = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState(null);
  const [isProfile, setIsProfile] = useState(false);
  const [isGroup, setIsGroup] = useState(false);

  //custom hook for getting the searchSuggesstion
  const searchSuggestion = useSearchUser(searchQuery, tokenFromLocal);

  //customHook for getCurrentUser
  useGetCurrentUser(tokenFromLocal);

  const createSingleChat = async (token, uId) => {
    const res = await fetch(`${BASE_API_URL}/api/chats/single`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: uId }),
    });
    const resData = await res.json();

    dispatch(createChat(resData));
  };

  //all chatOfUsers
  const allUserChats = useGetAllChats(tokenFromLocal);

  const handleCreateNewMessage = () => {
    createMessage();
  };

  //createmessage

  const createMessage = async () => {
    console.log("from create message", auth.currentUser.id);
    const res = await fetch(`${BASE_API_URL}/api/messages/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenFromLocal}`,
      },
      body: JSON.stringify({
        chatId: currentChat.id,
        content: content,
      }),
    });

    const resData = await res.json();
    console.log("create message", resData);
    dispatch(createNewMessage(resData));
  };

  //for profile popup
  const handleNavigate = () => {
    setIsProfile(!isProfile);
  };

  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreatGroup = () => {
    setIsGroup(true);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signout());
    navigate("/signin");
  };

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  };

  useEffect(() => {
    if (currentChat?.id) {
      getAllMessages();
    }
  }, [currentChat, message?.newMessages]);

  const getAllMessages = async () => {
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

  return (
    <div className="relative">
      <div className="py-14 bg-[#00a884] w-full"></div>
      <div className="flex bg-[#f0f2f5] w-[96vw] h-[90vh] absolute top-[5vh] left-[2vw]">
        {/* leftside */}
        <div className="w-[30%] bg-[#e8e9ec] h-full">
          {/* profile popup */}
          {isGroup && (
            <CreateGroup setIsGroup={setIsGroup} handleClose={handleClose} />
          )}
          {isProfile && (
            <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
          )}
          {!isProfile && !isGroup && (
            <div className="w-full">
              <div className="flex justify-between items-center p-3">
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer border-1 border-black"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt=""
                  />
                  <p>{auth.currentUser.fullName}</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/status");
                    }}
                  />
                  <BiCommentDetail />
                  <div>
                    <BsThreeDotsVertical
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleCreatGroup}>
                        Create Group
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  type="text"
                  placeholder="Search other user or start new Chat"
                  className="border-none outline-none bg-slate-200 rounded-md w-[93%] py-2 pl-9 "
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
                <AiOutlineSearch className="left-5 top-7 absolute" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>

              {/* all user */}
              <div className="bg-white overflow-y-scroll h-[72vh] px-3">
                {searchQuery &&
                  searchSuggestion?.map((item) => {
                    if (item.id != auth.currentUser.id)
                      return (
                        <div
                          onClick={() => {
                            createSingleChat(tokenFromLocal, item.id);
                            setSearchQuery("");
                          }}
                        >
                          <hr />
                          <ChatCard
                            name={item.fullName}
                            img={
                              item.profileImage ||
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            key={item.id}
                          />
                        </div>
                      );
                  })}

                {!searchQuery &&
                  allUserChats?.map((item) => {
                    return (
                      <div
                        className="hover:bg-slate-400"
                        onClick={() => {
                          handleCurrentChat(item);
                        }}
                      >
                        <hr />
                        {item.group ? (
                          <ChatCard
                            name={item.chatName}
                            img={
                              item.chatImage ||
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                          />
                        ) : (
                          <ChatCard
                            isChat={true}
                            name={
                              auth.currentUser.id !== item.users[0].id
                                ? item.users[0].fullName
                                : item.users[1].fullName
                            }
                            img={
                              auth.currentUser.id !== item.users[0].id
                                ? item.users[0].profileImage ||
                                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                : item.users[1].profileImage ||
                                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* right side default whatsapp page */}

        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center h-full ">
            <div className="max-w-[70%] text-center ">
              <img
                src="https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg?downsize=950:*"
                alt=""
              />
              <h1 className="text-4xl mt-1 text-gray-600">Whatsapp Web</h1>
              <p className="my-9">
                send and receive message without keeping your phone online.Use
                whatsapp on up to 4 linked devices and 1 phone at same time
              </p>
            </div>
          </div>
        )}

        {/* message part */}
        {currentChat && (
          <div className="w-[70%] relative bg-blue-200">
            <div className="header absolute top-0 w-full bg-[#f0f2f5]">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex items-center px-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      currentChat.group
                        ? currentChat.chatImage
                        : auth.currentUser.id != currentChat.users[0].id
                        ? currentChat.users[0].profileImage ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        : currentChat.users[1].profileImage ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt=""
                  />
                  <p>
                    {currentChat.group
                      ? currentChat.chatName
                      : auth.currentUser.id != currentChat.users[0].id
                      ? currentChat.users[0].fullName
                      : currentChat.users[1].fullName}
                  </p>
                </div>
                <div className="py-3 flex space-x-4 items-center justify-center px-3">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>

            {/* message section */}
            <div className="px-5 h-[85vh] overflow-x-scroll ">
              <div className="space-y-1 flex flex-col justify-center  mt-20 py-2">
                {message?.messages.length > 0 &&
                  message?.messages?.map((item, i) => (
                    <MessageCard
                      key={item.id}
                      isReqUserMessage={item.user.id === auth.currentUser.id}
                      content={item.content}
                    />
                  ))}
              </div>
            </div>
            {/* footer part */}
            <div className="footer absolute bottom-0 w-full py-3 text-2xl bg-[#f0f2f5]">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />

                <input
                  className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  type="text"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  placeholder="Type message"
                  value={content}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
                <BsMic />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
