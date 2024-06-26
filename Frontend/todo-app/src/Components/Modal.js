import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetModal } from "../RTKFiles/ModalSlice";
import {
  useAddTodoMutation,
  useUpdateTodoMutation,
} from "../RTKFiles/TODOQuery";

const Modal = () => {
  const { isNew, todo,pageId } = useSelector((store) => store.Modal);

  const [title, setTitle] = useState(todo?.task?.title);
  const [description, setDescription] = useState(todo?.task?.description);
  const dispatch = useDispatch();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const priority = useRef();

  const handleSaveCreate = () => {
    if (isNew) {
      addTodo({
        task: {
          title: title,
          description: description,
          priority: priority.current.value,
        },
        completed: false,
        createdAt: Math.floor(Date.now() / 1000),
        pageId:pageId
      });
    } else {
      updateTodo({
        task: {
          title: title,
          description: description,
          priority: priority.current.value,
        },
        createdAt: todo?.createdAt,
        updatedAt: Math.floor(Date.now() / 1000),
        completed: false,
        pageId:pageId
      });
    }
    dispatch(resetModal());
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-[3%]">
        <div className="relative md:w-3/6  my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {isNew ? "Create a TODO" : "Update TODO"}
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      placeholder="Title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></input>
                  </div>
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="priority"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Task Priority
                    </label>
                    <select
                      id="priority"
                      ref={priority}
                      defaultValue={isNew ? 1 : todo?.task?.priority}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={1}>Low</option>
                      <option value={2}>Medium</option>
                      <option value={3}>High</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => dispatch(resetModal())}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 disabled:bg-emerald-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSaveCreate}
                disabled = {!title || !description}
              >
                {!isNew ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
