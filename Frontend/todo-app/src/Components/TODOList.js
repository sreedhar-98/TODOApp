import React from "react";
import AddButton from "./AddButton";
import { useSelector } from "react-redux";
import TODOCard from "./TODOCard";

const TODOList = () => {
  const tabData = useSelector((store) => store.tab);
  const { isTodo } = tabData;
  return (
    <div className="my-8 flex flex-col gap-3">
      {isTodo && <AddButton />}

      <div>
        <div className="flex flex-col gap-2">
          {[...Array(15)].map((_, index) => (
            <TODOCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TODOList;
