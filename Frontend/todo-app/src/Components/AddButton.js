import React from "react";
import AddIcon from "../SVG/AddIcon.svg";

const AddButton = () => {
  return (
    <div>
      <button
        type="button"
        className="px-5 py-3 text-base font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <img
          src={AddIcon}
          alt="AdIcon"
          className="w-6 h-6 text-black dark:text-white mx-2"
        ></img>
        Add TODO
      </button>
    </div>
  );
};

export default AddButton;
