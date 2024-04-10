import React from "react";
import AddButton from "./AddButton";
import { useSelector } from "react-redux";
import TODOCard from "./TODOCard";
import Modal from "./Modal";
import { useGetTodosQuery } from "../RTKFiles/TODOQuery";

const TODOList = () => {
  const tabData = useSelector((store) => store.tab);
  const ModalData = useSelector((store) => store.Modal);
  const { isTodo } = tabData;
  const { data, isSuccess, isLoading,isError } = useGetTodosQuery();

  if (isLoading || isError) return;
  

  const todo_filtered_data = data["todos"].filter((todo) => {
    return !todo.completed;
  });

  const completed_filtered_data = data["todos"].filter((todo) => {
    return todo.completed;
  });

  return (
    <div className="my-8 flex flex-col gap-3">
      <div className="flex gap-6 items-center">
        {isTodo && <AddButton />}
        <div>
          <select
            defaultValue={"datehigh"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={"datehigh"}>Created Date (Latest to Oldest)</option>
            <option value={"datelow"}>Created Date (Oldest to Latest)</option>
            <option value={"priorityhigh"}>Priority (High to Low)</option>
            <option value={"prioritylow"}>Priority (Low to High)</option>
          </select>
        </div>
      </div>

      {ModalData && <Modal />}

      <div>
        <div className="flex flex-col gap-2">
          {isSuccess &&
            isTodo &&
            todo_filtered_data.map((todo) => (
              <TODOCard key={todo?.createdAt} task={todo} />
            ))}

          {isSuccess &&
            !isTodo &&
            completed_filtered_data.map((todo) => (
              <TODOCard key={todo?.createdAt} task={todo} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TODOList;
