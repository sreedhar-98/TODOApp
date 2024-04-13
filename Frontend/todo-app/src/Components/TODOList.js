import React, { useMemo, useState } from "react";
import AddButton from "./AddButton";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { useGetTodosQuery } from "../RTKFiles/TODOQuery";
import DisplayTodos from "./DisplayTodos";
import PreviousIcon from "../SVG/PreviousIcon.svg";
import NextIcon from "../SVG/NextIcon.svg";

const TODOList = () => {
  const ModalData = useSelector((store) => store.Modal);
  const [sortOption, setSortOption] = useState("datehigh");
  const [filterOption, setFilterOption] = useState("none");
  const [pages, setPages] = useState([]);
  const { data, isSuccess, isLoading, isError } = useGetTodosQuery({
    lastkey: pages.length > 0 ? pages[pages.length - 1] : undefined,
  });

  const todo_filtered_data = useMemo(() => {
    if (data) return data["todos"].filter((todo) => !todo.completed);
  }, [data]);

  const completed_filtered_data = useMemo(() => {
    if (data) return data["todos"].filter((todo) => todo.completed);
  }, [data]);

  const NextHandler = () => {
    setPages([...pages, data?.LastEvaluatedKey]);
  };

  const PreviousHandler = () => {
    setPages(pages.slice(0, -1));
  };

  if (isLoading || isError) return;
  return (
    <div className="my-8 flex flex-col gap-3">
      <div className="flex gap-6 items-center">
        {filterOption !== "completed" && <AddButton setPages={setPages} />}
        {data["todos"].length > 1 && (
          <>
            <div>
              <select
                defaultValue={"datehigh"}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={"datehigh"}>
                  Created Date (Latest to Oldest)
                </option>
                <option value={"datelow"}>
                  Created Date (Oldest to Latest)
                </option>
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
          </>
        )}
      </div>

      {ModalData && <Modal />}

      <div>
        <div className="flex flex-col gap-2">
          {isSuccess && filterOption === "none" && (
            <DisplayTodos
              sortOption={sortOption}
              data={data["todos"]}
              pageId={pages.length === 0 ? undefined : pages[pages.length - 1]}
            />
          )}
          {isSuccess && filterOption === "todo" && (
            <DisplayTodos
              sortOption={sortOption}
              data={todo_filtered_data}
              pageId={pages.length === 0 ? undefined : pages[pages.length - 1]}
            />
          )}
          {isSuccess && filterOption === "completed" && (
            <DisplayTodos
              sortOption={sortOption}
              data={completed_filtered_data}
              pageId={pages.length === 0 ? undefined : pages[pages.length - 1]}
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center mt-2">
        <button
          className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium
         text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100
          hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-gray-300"
          onClick={PreviousHandler}
          disabled={pages.length === 0}
        >
          <img
            src={PreviousIcon}
            alt="Previous"
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
          ></img>
          Previous
        </button>
        <button
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500
         bg-white border border-gray-300 rounded-lg hover:bg-gray-100
          hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-gray-300"
          onClick={NextHandler}
          disabled={!data?.LastEvaluatedKey}
        >
          Next
          <img
            src={NextIcon}
            alt="nextIcon"
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          ></img>
        </button>
      </div>
    </div>
  );
};

export default TODOList;
