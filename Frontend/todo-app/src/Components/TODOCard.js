import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../RTKFiles/ModalSlice";
import dateformatter from "../utils/dateformatter";
import getpriority from "../utils/getpriority";
import ConfirmModal from "./ConfirmModal";

const TODOCard = ({ task }) => {
  const tabData = useSelector((store) => store.tab);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const onUpdateClick = () => {
    dispatch(setModal({ isNew: false, todo: task }));
  };
  const onDeleteClick = () => {
    setShow(true);
    setIsDelete(true);
  };

  const onCheckBoxChange = (e) => {
    setShow(true);
    setIsDelete(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 w-[90%] flex flex-col flex-wrap">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold mb-2">{task?.task?.title}</h2>
        <span
          className={`${
            task?.task?.priority === "1"
              ? "text-green-500"
              : task?.task?.priority === "2"
              ? "text-yellow-500"
              : "text-red-600"
          } font-bold`}
        >
          {getpriority(task?.task?.priority)}
        </span>
      </div>
      <p className="text-gray-600 whitespace-pre-wrap">
        {task?.task?.description}
      </p>
      <div className="flex items-center justify-between mt-4">
        {tabData?.isTodo && (
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={onCheckBoxChange}
              checked={show && !isDelete}
            />
            <label>Completed</label>
          </div>
        )}

        <div className="text-sm text-gray-500 flex gap-6">
          <span className="text-sm font-bold">
            Created At: {dateformatter(task?.createdAt)}
          </span>
          <span className="text-sm font-bold">
            {task?.completed
              ? `Completed At : ${dateformatter(task?.updatedAt)}`
              : task?.updatedAt
              ? `Last Updated :${dateformatter(task?.updatedAt)}`
              : null}
          </span>
        </div>
        <div className="flex space-x-2">
          {tabData?.isTodo && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-2 rounded-md"
              onClick={onUpdateClick}
            >
              Update
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-2 rounded-md"
            onClick={onDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
      {show && isDelete && (
        <ConfirmModal
          setShow={setShow}
          todo={task}
          isCompleted={false}
        />
      )}
      {show && !isDelete && (
        <ConfirmModal
          setShow={setShow}
          todo={task}
          isCompleted={true}
        />
      )}
    </div>
  );
};

export default TODOCard;
