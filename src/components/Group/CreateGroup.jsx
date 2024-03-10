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
import useSearchUser from "../../apicalls/useSearchUser";
import { useSelector } from "react-redux";
const CreateGroup = ({ setIsGroup, handleClose }) => {
  const currentUser = useSelector((store) => store.auth.currentUser);
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Map());
  const [gm, setGm] = useState(Array.from(groupMember.values()));

  // const allGroupMember = Array.from(groupMember);
  const handleRemoveMember = (item) => {
    console.log(groupMember.delete(item.id));
    setGroupMember(groupMember);
    setGm(Array.from(groupMember.values()));
  };

  const handleBack = () => {
    setIsGroup(false);
    handleClose();
  };

  const [searchQuery, setSearchQuery] = useState("");
  const tokenFromLocal = localStorage.getItem("token");
  const searchUser = useSearchUser(searchQuery, tokenFromLocal);
  return (
    <div className="w-full h-full">
      {!newGroup && (
        <div>
          <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
            <BsArrowLeft
              className="cursor-pointer text-2xl font-bold"
              onClick={handleBack}
            />
            <p className="text-xl font-semibold">Add Group Participant</p>
          </div>
          <div className="relative bg-white py-4 px-3">
            <div className="flex space-x-2 flex-wrap space-y-1">
              {gm.map((item) => (
                <SelectedMember
                  handleRemoveMember={() => handleRemoveMember(item)}
                  member={item}
                />
              ))}
            </div>

            <input
              className="outline-none border-b border-[#8888] p-2 w-[93%]"
              type="text"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="search user"
              value={searchQuery}
            />
          </div>
          <div className="bg-white overflow-y-scroll h-[50.2vh] p-3">
            {searchQuery &&
              searchUser?.map((item) => {
                if (item.id != currentUser.id) {
                  return (
                    <div
                      onClick={() => {
                        groupMember.set(item.id, item);
                        setGroupMember(groupMember);
                        setGm(Array.from(groupMember.values()));
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
                }
              })}
          </div>
          {groupMember.size > 0 && (
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
          )}
        </div>
      )}
      {newGroup && (
        <NewGroup
          setNewGroup={setNewGroup}
          groupMember={gm}
          handleBack={handleBack}
        />
      )}
    </div>
  );
};

export default CreateGroup;
