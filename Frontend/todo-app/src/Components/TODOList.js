import React, { useMemo, useState } from "react";
import AddButton from "./AddButton";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { useGetTodosQuery } from "../RTKFiles/TODOQuery";
import DisplayTodos from "./DisplayTodos";

const TODOList = () => {
  const ModalData = useSelector((store) => store.Modal);
  const { data, isSuccess, isLoading, isError } = useGetTodosQuery();
  const [sortOption, setSortOption] = useState("datehigh");
  const [filterOption, setFilterOption] = useState("none");

  const todo_filtered_data = useMemo(() => {
    if (data) return data["todos"].filter((todo) => !todo.completed);
  }, [data]);

  const completed_filtered_data = useMemo(() => {
    if (data) return data["todos"].filter((todo) => todo.completed);
  }, [data]);

  if (isLoading || isError) return;

  return (
    <div className="my-8 flex flex-col gap-3">
      <div className="flex gap-6 items-center">
        {filterOption !== "completed" && <AddButton />}
        <div>
          <select
            defaultValue={"datehigh"}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={"datehigh"}>Created Date (Latest to Oldest)</option>
            <option value={"datelow"}>Created Date (Oldest to Latest)</option>
            <option value={"priorityhigh"}>Priority (High to Low)</option>
            <option value={"prioritylow"}>Priority (Low to High)</option>
            {filterOption === "completed" && (
              <option value={"completedhigh"}>
                Completed Date (Latest to Oldest)
              </option>
            )}
            {filterOption === "completed" && (
              <option value={"completedlow"}>
                Completed Date (Oldest to Latest)
              </option>
            )}
          </select>
        </div>
        <div>
          <select
            defaultValue={"none"}
            onChange={(e) => setFilterOption(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={"none"}>None</option>
            <option value={"todo"}>TODO</option>
            <option value={"completed"}>Completed</option>
          </select>
        </div>
      </div>

      {ModalData && <Modal />}

      <div>
        <div className="flex flex-col gap-2">
          {isSuccess && filterOption === "none" && (
            <DisplayTodos sortOption={sortOption} data={data["todos"]} />
          )}
          {isSuccess && filterOption === "todo" && (
            <DisplayTodos sortOption={sortOption} data={todo_filtered_data} />
          )}
          {isSuccess && filterOption === "completed" && (
            <DisplayTodos
              sortOption={sortOption}
              data={completed_filtered_data}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TODOList;
