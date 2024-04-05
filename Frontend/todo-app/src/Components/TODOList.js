import React, { useState } from "react";
import AddButton from "./AddButton";
import { useDispatch, useSelector } from "react-redux";
import TODOCard from "./TODOCard";
import { disableCompleted } from "../RTKFiles/tabSlice";

const TODOList = () => {
  const tabData = useSelector((store) => store.tab);
  const [isAdd,setIsAdd] = useState(false);
  const dispatch=useDispatch();
  const { isTodo } = tabData;

  const handleAdd = ()=>{
    setIsAdd(true);
    dispatch(disableCompleted({isUpdate:true}));
  }
  console.log(isAdd);
  return (
    <div className="my-8 flex flex-col gap-3">
      {isTodo && tabData.disableCompleted===0 &&  <AddButton handleAdd={handleAdd}/>}

      <div>
        <div className="flex flex-col gap-2">
          {isAdd && <TODOCard isCreate={true} setIsAdd={setIsAdd}/>}
          {[...Array(2)].map((_, index) => (
            <TODOCard key={index} isCreate={false}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TODOList;
