import React from "react";

const ChatCard = () => {
  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer">
      <div className="w-[20%]">
        <img
          className="h-14 w-14 rounded-full"
          src="https://media.istockphoto.com/id/478066390/photo/trust-in-teamwork-of-bees-bridging-two-bee-swarm-parts.jpg?s=2048x2048&w=is&k=20&c=z72XGRPSexYR56yBoTLsBQmy-eCiXYJImGTNwIv8jiI="
          alt=""
        />
      </div>
      <div className="pl-5 w-[80%]">
        <div className="flex justify-between items-center">
          <p className="text-lg">username</p>
          <p className="text-sm">timestamp</p>
        </div>
        <div className="flex justify-between items-center">
          <p>messages...</p>
          <div className="flex space-x-2 items-center">
            <p className="text-xs py-1 px-2 text-white bg-green-500 rounded-full">
              5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
