import React, { useState } from "react";

const TODOCard = ({ setDisableCompleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("title");
  const [editedDescription, setEditedDescription] = useState("description");
  const onUpdateClick = () => {
    setIsEditing(true);
    setDisableCompleted(true);
  };
  const onCancelClick = () => {
    setIsEditing(false);
    setDisableCompleted(false);
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 h-full w-full">
      {!isEditing ? (
        <h2 className="text-lg font-semibold mb-2">{editedTitle}</h2>
      ) : (
        <input
          type="text"
          className="text-lg font-semibold mb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full mt-2 px-3 py-2"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Title"
        />
      )}
      {isEditing ? (
        <textarea
          className="text-gray-600 border-b  focus:outline-none focus:border-blue-500 w-full h-full my-3 border border-gray-300 px-3 py-2"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Description"
          rows={6}
        ></textarea>
      ) : (
        <p className="text-gray-600 whitespace-pre-wrap">{editedDescription}</p>
      )}
      <div className="flex items-center justify-between mt-4">
        {!isEditing && (
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label>Completed</label>
          </div>
        )}

        {!isEditing && (
          <div className="text-sm text-gray-500 flex gap-6">
            <span className="text-sm font-bold">
              Created At: {"12-03-2024"}
            </span>
            <span className="text-sm font-bold">
              Updated At: {"12-03-2024"}{" "}
            </span>
          </div>
        )}
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-2 rounded-md"
            onClick={onUpdateClick}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-2 rounded-md"
            onClick={onCancelClick}
          >
            {!isEditing ? "Delete" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TODOCard;
