import React, { useEffect, useState } from "react";
import "./Progressbar.css";

const Progressbar = ({ index, activeIndex, duration }) => {
  const isActive = index === activeIndex;
  const [progress, setProgress] = useState();

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);
  useEffect(() => {
    console.log("progress start");
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(intervalId);
        return prev;
      });
    }, duration / 100);
  }, [activeIndex]);

  return (
    <div className={`progressbar-container ${isActive ? "active" : ""}`}>
      <div
        className={`${isActive ? "progress-bar" : ""}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Progressbar;
