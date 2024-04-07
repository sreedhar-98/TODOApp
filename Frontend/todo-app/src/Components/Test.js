import React from "react";
import LoadingSpinner from "../SVG/LoadingSpinner.svg";
const Test = () => {
  return (
    <>
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
      >
        <img
          src={LoadingSpinner}
          alt="spinner"
          className="inline mr-3 w-4 h-4 text-white animate-spin"
        ></img>
      </button>
    </>
  );
};

export default Test;
