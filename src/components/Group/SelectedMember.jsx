import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({ handleRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full p-1 ">
      <img
        className="w-7 h-7 rounded-full"
        src="https://cdn.pixabay.com/photo/2024/02/23/17/26/clock-8592484_960_720.jpg"
        alt=""
      />
      <p className="px-2">{member.fullName}</p>
      <AiOutlineClose
        onClick={() => {
          console.log("from selected ", member);
          handleRemoveMember();
        }}
        className="pr-1 cursor-pointer"
      />
    </div>
  );
};

export default SelectedMember;
