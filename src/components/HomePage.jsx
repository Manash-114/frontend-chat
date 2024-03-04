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

const HomePage = () => {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [currentChat, setCurrentChat] = useState(null);

  const [content, setContent] = useState(null);

  const [isProfile, setIsProfile] = useState(false);

  const [isGroup, setIsGroup] = useState(false);

  const [searchSuggestion, setSearchSuggestion] = useState([]);

  const cacheSearchData = useSelector((store) => store.auth.searchUser);

  const getSearchSuggestion = async () => {
    // console.log("api call with ", searchQuery);
    const res = await fetch(`${BASE_API_URL}/api/users/${searchQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenFromLocal}`,
      },
    });
    const resData = await res.json();
    dispatch(searchUser({ [searchQuery]: resData }));
    setSearchSuggestion(resData);
  };
  const handleClickOnChatCard = () => {
    setCurrentChat(true);
  };

  const tokenFromLocal = localStorage.getItem("token");
  const handleCreateNewMessage = () => {};
  //for profile popup
  const handleNavigate = () => {
    // navigate("/profile")
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

  // useEffect(() => {
  //   if (!auth.reqUser) navigate("/signup");
  // }, [auth.reqUser]);
  const getCurrentUser = async (jwtToken) => {
    try {
      const res = await fetch(`${BASE_API_URL}/api/users/profile`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const resData = await res.json();
      console.log("data from backend ", resData);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("cache data", cacheSearchData);
      if (cacheSearchData[searchQuery]) {
        setSearchSuggestion(cacheSearchData[searchQuery]);
        console.log("seach suggestion", searchSuggestion);
      } else {
        if (searchQuery.length > 0) getSearchSuggestion();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

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
                        <div onClick={handleClickOnChatCard}>
                          <hr />
                          <ChatCard item={item} />
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
                    src="https://cdn.pixabay.com/photo/2024/02/27/02/06/ai-generated-8599226_1280.jpg"
                    alt=""
                  />
                  <p>username</p>
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
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                  (item, i) => (
                    <MessageCard
                      isReqUserMessage={i % 2 == 0}
                      content={"message"}
                    />
                  )
                )}
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
