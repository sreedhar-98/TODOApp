import React, { useState } from "react";

const TODOTabs = ({ disableCompleted }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTodo, setIsTodo] = useState(true);
  return (
    <>
      <div className="sm:hidden">
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option>TODO</option>
          <option>Completed</option>
        </select>
      </div>
      <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full focus-within:z-10">
          <span
            className={`cursor-pointer inline-block w-full p-4 text-gray-900 ${
              !isTodo ? "bg-gray-200" : "bg-blue-500"
            } border-r border-gray-200 dark:border-gray-700 rounded-s-lg`}
            aria-current="page"
            onClick={() => {
              setIsTodo(true);
              setIsCompleted(false);
            }}
          >
            TODO
          </span>
        </li>
        <li className="w-full focus-within:z-10">
          <span
            className={`cursor-pointer inline-block w-full p-4 border-r ${
              disableCompleted ? "text-white" : "text-black"
            } ${
              isCompleted
                ? "bg-blue-500"
                : disableCompleted
                ? "bg-gray-500"
                : "bg-gray-200"
            }`}
            onClick={() => {
              if (disableCompleted) return null;
              setIsCompleted(true);
              setIsTodo(false);
            }}
          >
            Completed
          </span>
        </li>
      </ul>
    </>
  );
};

export default TODOTabs;
