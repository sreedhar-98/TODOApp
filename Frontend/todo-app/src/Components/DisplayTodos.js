import React from "react";
import TODOCard from "./TODOCard";
import {
  sortTodosByCompletedDate,
  sortTodosByPriority,
} from "../utils/SortTodos";

const DisplayTodos = ({ sortOption, data }) => {
  const sortFunctions = {
    priorityhigh: (data) => sortTodosByPriority(data, true),
    prioritylow: (data) => sortTodosByPriority(data, false),
    completedhigh: (data) => sortTodosByCompletedDate(data, true),
    completedlow: (data) => sortTodosByCompletedDate(data, false),
  };
  return (
    <>
      {(sortOption === "datehigh"
        ? data
        : sortOption === "datelow"
        ? data.slice().reverse()
        : sortFunctions[sortOption](data.slice())
      ).map((todo) => (
        <TODOCard key={todo?.createdAt} task={todo} />
      ))}
    </>
  );
};

export default DisplayTodos;
