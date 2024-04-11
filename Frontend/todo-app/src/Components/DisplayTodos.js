import React from "react";
import TODOCard from "./TODOCard";
import { sortFunctions } from "../utils/helperObjects";

const DisplayTodos = ({ sortOption, data }) => {
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
