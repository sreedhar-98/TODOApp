import React from "react";
import BackgroundImage from "../Images/BackgroundImage.jpg";
import Header from "./Header";
import TODOTabs from "./TODOTabs";
import TODOCard from "./TODOCard";

const TODOPage = () => {
  return (
    <div>
      <div
        className="w-screen, h-screen bg-cover"
        style={{ backgroundImage: `url(${BackgroundImage})`, opacity: 0.7 }}
      >
        <Header />
        <div className="w-[80%] mx-auto my-8 flex flex-col">
          <TODOTabs />
          <div className="my-4">
            <TODOCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TODOPage;
