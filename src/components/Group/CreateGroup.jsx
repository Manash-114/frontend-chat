import { grid2Classes } from "@mui/material";
import React, { useState } from "react";
import {
  BsArrowLeft,
  BsArrowRight,
  BsEmojiSmile,
  BsFilter,
  BsMic,
  BsThreeDotsVertical,
} from "react-icons/bs";
import SelectedMember from "./SelectedMember";
import ChatCard from "../ChatCard/ChatCard";
import NewGroup from "./NewGroup";
const CreateGroup = ({ setIsGroup, handleClose }) => {
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());
  const allGroupMember = Array.from(groupMember);
  const handleRemoveMember = (item) => {
    groupMember.delete(item);
    setGroupMember(groupMember);
  };

  const [query, setQuery] = useState();
  const handleSearch = () => {};
  return (
    <div className="w-full h-full">
      {!newGroup && (
        <div>
          <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
            <BsArrowLeft
              className="cursor-pointer text-2xl font-bold"
              onClick={() => {
                setIsGroup(false);
                handleClose();
              }}
            />
            <p className="text-xl font-semibold">Add Group Participant</p>
          </div>
          <div className="relative bg-white py-4 px-3">
            {Array.from(groupMember).length > 0 && (
              <div className="flex space-x-2 flex-wrap space-y-1">
                {console.log("hi", groupMember)}
                {Array.from(groupMember).map((item) => (
                  <SelectedMember
                    handleRemoveMember={() => handleRemoveMember(item)}
                    member={item}
                  />
                ))}
              </div>
            )}
            <input
              className="outline-none border-b border-[#8888] p-2 w-[93%]"
              type="text"
              onChange={(e) => {
                handleSearch(e.target.value);
                setQuery(e.target.value);
              }}
              placeholder="search user"
              value={query}
            />
          </div>
          <div className="bg-white overflow-y-scroll h-[50.2vh] p-3">
            {query &&
              [123, 132, 31, 1233].map((item) => (
                <div
                  onClick={() => {
                    groupMember.add(item);
                    setGroupMember(groupMember);
                    setQuery("");
                  }}
                >
                  <hr />
                  <ChatCard />
                </div>
              ))}
          </div>
          <div className="bottom-10 bg-slate-200 flex items-center justify-center">
            <div
              className="bg-green-600 rounded-full p-4 cursor-pointer mt-2"
              onClick={() => {
                setNewGroup(true);
              }}
            >
              <BsArrowRight className="text-white font-bold text-3xl" />
            </div>
          </div>
        </div>
      )}
      {newGroup && <NewGroup setNewGroup={setNewGroup} />}
    </div>
  );
};

export default CreateGroup;
