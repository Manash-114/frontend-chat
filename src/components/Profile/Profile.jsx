import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileApi } from "../../apicalls/updateProfileApi";
import { Box, CircularProgress } from "@mui/material";

const Profile = ({ handleCloseOpenProfile, handleClose }) => {
  const { currentUser } = useSelector((store) => store.auth);
  const [userName, setUserName] = useState("");
  const [tempProfileImage, setTempProfileImage] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const tokenFromLocal = localStorage.getItem("token");
  const handleNameUpdate = () => {
    setFlag(false);
    updateProfileApi(
      dispatch,
      { fullName: userName, profileImage: currentUser.profileImage },
      tokenFromLocal
    );
  };

  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setUserName(e.target.value);
  };

  const uploadImageToCloudinary = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "whatsappPreset");
    data.append("cloud_name", "dqhrisflx");

    fetch("https://api.cloudinary.com/v1_1/dqhrisflx/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        updateProfileApi(
          dispatch,
          { fullName: currentUser.fullName, profileImage: data.url.toString() },
          tokenFromLocal,
          setIsUpload
        );
      });
  };

  const [flag, setFlag] = useState(false);
  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 tx-10 pb-5 px-2">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={() => {
            handleCloseOpenProfile();
            handleClose();
          }}
        />
        <p className="cursor-pointer font-semibold ">Profile</p>
      </div>
      {/* update profile pic section */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
            src={
              currentUser.profileImage
                ? currentUser.profileImage
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
          />
        </label>
        <input
          onChange={(e) => {
            setIsUpload(true);
            uploadImageToCloudinary(e.target.files[0]);
          }}
          type="file"
          id="imgInput"
          className="hidden"
        />
        {isUpload && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </div>

      {/* name section */}

      <div className="bg-white px-4">
        <p className="py-3 ">Your Name</p>
        {!flag && (
          <div className="flex w-full justify-between items-center">
            <p className="py-3">{userName || currentUser.fullName}</p>
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
