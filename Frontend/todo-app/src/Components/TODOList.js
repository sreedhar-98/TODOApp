import React, { useState } from "react";
import AddButton from "./AddButton";
import { useSelector } from "react-redux";
import TODOCard from "./TODOCard";
import Modal from "./Modal";

const TODOList = () => {
  const tabData = useSelector((store) => store.tab);
  const [showModal, setShowModal] = useState(false);
  const { isTodo } = tabData;
  const task = {
    completed: false,
    createdAt: "1712148373",
    todoId: "0f169550-aef9-46f2-8676-35fd91b8b0f5",
    task: {
      title: "Aksajdhckjus",
      description: "sdjfvhskdjvfh",
    },
    userId: "asbvcsygv",
  };


  const handleAdd = () => {
    setShowModal(true);
  };
  return (
    <div className="my-8 flex flex-col gap-3">
      {isTodo && <AddButton handleAdd={handleAdd}/>}

      {showModal && <Modal setShowModal={setShowModal} isNew={true} task={task}/>}

      <div>
        <div className="flex flex-col gap-2">
          {[...Array(2)].map((_, index) => (
            <TODOCard key={index} isCreate={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TODOList;
