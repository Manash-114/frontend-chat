import React, { useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import ChatCard from "./ChatCard/ChatCard";

const HomePage = () => {
  const [query, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const handleSearch = () => {};
  const handleClickOnChatCard = () => {
    setCurrentChat(true);
  };

  return (
    <div className="relative">
      <div className="py-14 bg-[#00a884] w-full"></div>
      <div className="flex bg-[#f0f2f5] w-full h-[90vh] absolute top-6 left-6">
        {/* leftside */}
        <div className="w-[30%] bg-[#e8e9ec] h-full">
          <div className="w-full">
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center space-x-3">
                <img
                  className="rounded-full w-10 h-10 cursor-pointer"
                  src="https://cdn.pixabay.com/photo/2024/02/23/15/11/honey-bee-8592216_1280.jpg"
                  alt=""
                />
                <p>username</p>
              </div>
              <div className="space-x-3 text-2xl flex">
                <TbCircleDashed />
                <BiCommentDetail />
              </div>
            </div>
            <div className="relative flex justify-center items-center bg-white py-4 px-3">
              <input
                type="text"
                placeholder="Search or start new Chat"
                className="border-none outline-none bg-slate-200 rounded-md w-[93%] py-2 pl-9 "
                onChange={(e) => {
                  setQuerys(e.target.value);
                  handleSearch(e.target.value);
                }}
                value={query}
              />
              <AiOutlineSearch className="left-5 top-7 absolute" />
              <div>
                <BsFilter className="ml-4 text-3xl" />
              </div>
            </div>

            {/* all user */}
            <div className="bg-white overflow-y-scroll h-[76.8vh] px-3">
              {query &&
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
                  <div onClick={handleClickOnChatCard}>
                    <hr />
                    <ChatCard />
                  </div>
                ))}
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default HomePage;
