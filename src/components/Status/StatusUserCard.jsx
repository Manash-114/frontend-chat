import React from "react";
import { useNavigate } from "react-router-dom";

const StatusUserCard = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/status/{userId}");
  };
  return (
    <div>
      <div
        onClick={handleNavigate}
        className="flex items-center p-2 cursor-pointer"
      >
        <img
          className="w-7 h-7 lg:w-10 lg:h-10 rounded-full"
          src="https://media.istockphoto.com/id/1205094105/photo/asiatic-lion-a-critically-endangered-species.jpg?s=2048x2048&w=is&k=20&c=hH4mfdvwHilDEITkE_h5rGgWFXwsKN6l8qDZf9vH4Bg="
          alt=""
        />
        <div className="ml-2 text-white ">
          <p>manash</p>
        </div>
      </div>
    </div>
  );
};

export default StatusUserCard;
