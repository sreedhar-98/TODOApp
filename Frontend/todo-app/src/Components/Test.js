import React, { useState } from "react";
import CompletedCheckModal from "./ConfirmModal";

const Test = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShow(true)}
      >
        Show
      </button>

      {show && <CompletedCheckModal setShow={setShow} />}
    </>
  );
};

export default Test;
