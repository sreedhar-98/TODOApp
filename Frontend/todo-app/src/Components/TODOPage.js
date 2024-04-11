import React from "react";
import BackgroundImage from "../Images/BackgroundImage.jpg";
import Header from "./Header";
import TODOList from "./TODOList";

const TODOPage = () => {
  return (
    <div className=""> 
      <div
        className="w-screen, h-screen bg-cover flex flex-col overflow-auto"
        style={{ backgroundImage: `url(${BackgroundImage})`, opacity: 0.7 }}
      >
        <Header />
        <div className="w-[80%] mx-auto my-8 flex flex-col">
          <TODOList/>
        </div>
      </div>
    </div>
  );
};

export default TODOPage;

