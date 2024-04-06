import React, { useState } from "react";
import { useSelector } from "react-redux";

const TODOCard = () => {
  const tabData = useSelector((store) => store.tab);
  const onUpdateClick = () => {
    console.log('Update');
  };
  const onDeleteClick = () => {
    console.log("Delete");
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 w-[90%] flex flex-col flex-wrap">
      <h2 className="text-lg font-semibold mb-2">{"editedTitle"}</h2>
      <p className="text-gray-600 whitespace-pre-wrap">{"editedDescription"}</p>
      <div className="flex items-center justify-between mt-4">
        {tabData?.isTodo && (
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label>Completed</label>
          </div>
        )}

  
          <div className="text-sm text-gray-500 flex gap-6">
            <span className="text-sm font-bold">
              Created At: {"12-03-2024"}
            </span>
            <span className="text-sm font-bold">
              {tabData?.isCompleted
                ? `Completed At : ${"12-03-2025"}`
                : `Last Updated :${"12-03-2024"}`}
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
    </div>
  );
};

export default TODOCard;
