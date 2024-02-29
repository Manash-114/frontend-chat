import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Profile = ({ handleCloseOpenProfile }) => {
  const [userName, setUserName] = useState("");

  const handleNameUpdate = () => {
    setFlag(false);
  };

  const handleOnChange = (e) => {
    setUserName(e.target.value);
  };

  const [flag, setFlag] = useState(false);
  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 tx-10 pb-5 px-2">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={handleCloseOpenProfile}
        />
        <p className="cursor-pointer font-semibold ">Profile</p>
      </div>
      {/* update profile pic section */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
            src="https://media.istockphoto.com/id/1173184751/photo/asiatic-lion-a-critically-endangered-species.jpg?s=2048x2048&w=is&k=20&c=vQA2rkldDQpRRcg4dW83UtA61uwozd0Uh8g6bd8zJ7E="
            alt=""
          />
        </label>
        <input type="file" id="imgInput" className="hidden" />
      </div>

      {/* name section */}

      <div className="bg-white px-4">
        <p className="py-3 ">YourName</p>
        {!flag && (
          <div className="flex w-full justify-between items-center">
            <p className="py-3">{userName || "username"}</p>
            <BsPencil
              className="cursor-pointer"
              onClick={() => {
                setFlag(true);
              }}
            />
          </div>
        )}
        {flag && (
          <div className=" w-full flex justify-between">
            <input
              type="text"
              placeholder="Enter your name"
              className="outline-none w-[80%] border-b-2 border-blue-700 p-2"
              onChange={handleOnChange}
              value={userName}
            />
            <BsCheck2
              className="cursor-pointer text-2xl "
              onClick={handleNameUpdate}
            />
          </div>
        )}
      </div>
      <div className="px-3 my-5">
        <p className="p-10">
          This is not your username , this name will be visible to your whatsapp
          contact
        </p>
      </div>
    </div>
  );
};

export default Profile;
