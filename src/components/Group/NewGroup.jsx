import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { createGroup } from "../../apicalls/groupchat/createGroup";
import { useDispatch, useSelector } from "react-redux";

const NewGroup = ({ setNewGroup, groupMember, handleBack }) => {
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState();
  const [image, setImage] = useState();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const userIds = [];
  groupMember.forEach((i) => {
    userIds.push(i.id);
  });
  userIds.push(currentUser.id);
  const tokenFromLocal = localStorage.getItem("token");
  const handLeGroupCreate = () => {
    uploadImageToCloudinary();
  };

  const uploadImageToCloudinary = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "whatsappPreset");
    data.append("cloud_name", "dqhrisflx");

    fetch("https://api.cloudinary.com/v1_1/dqhrisflx/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.url);
        const data = {
          userId: userIds,
          groupName: groupName,
          groupImage: res.url.toString(),
        };
        createGroup(tokenFromLocal, data, dispatch);
        setNewGroup(false);
        handleBack();
      });
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 text-black pt-16 px-10 pb-5">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={() => {
            setNewGroup(false);
          }}
        />
        <p className="text-xl font-semibold">New Group</p>
      </div>
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput" className="relative">
          <img
            className="w-32 h-32 rounded-full"
            src="https://cdn.pixabay.com/photo/2016/12/19/10/16/hands-1917895_1280.png"
            alt=""
          />
          {isImageUploading && (
            <CircularProgress className="absolute top-[5rem] left-[6rem]" />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          onChange={(e) => {
            setImage(e.target.files[0]);
            console.log("imagechange");
          }}
        />
      </div>
      <div className="w-full flex justify-between items-center py-2 px-5">
        <input
          className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent"
          type="text"
          onChange={(e) => {
            console.log("onchange....");
            setGroupName(e.target.value);
          }}
          placeholder="Enter Group name"
          value={groupName}
        />
      </div>
      {groupName && (
        <div className="py-10 bg-slate-200 flex items-center justify-center">
          <Button onClick={handLeGroupCreate}>
            <div className="bg-[#0c977d] rounded-full p-4">
              <BsCheck2 className="text-white font-bold text-3xl" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewGroup;
