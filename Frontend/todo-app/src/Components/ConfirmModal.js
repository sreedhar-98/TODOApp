import React from "react";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../RTKFiles/TODOQuery";
import DeleteIcon from "../SVG/DeleteIcon.svg";
import CompletedIcon from "../SVG/CompletedIcon.svg";

const ConfirmModal = ({ setShow, todo, isCompleted, pageId }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const checkHandler = () => {
    if (!isCompleted) {
      deleteTodo({ createdAt: todo.createdAt, pageId: pageId });
    } else {
      updateTodo({
        ...todo,
        completed: true,
        updatedAt: Math.floor(Date.now() / 1000),
        pageId: pageId,
      });
    }
    setShow(false);
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {!isCompleted ? (
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <img
                      src={DeleteIcon}
                      alt="deleteIcon"
                      className="h-6 w-6 text-red-600"
                    ></img>
                  </div>
                ) : (
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-ful sm:mx-0 sm:h-10 sm:w-10">
                    <img
                      src={CompletedIcon}
                      alt="CompletedIcon"
                      className="h-8 w-8"
                    ></img>
                  </div>
                )}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {!isCompleted ? "Delete TODO" : "Mark Completed"}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-800">
                      {!isCompleted
                        ? "Are you sure you want to delete your TODO? This action cannot be undone."
                        : "Great job! Ready to mark this task as complete?"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={checkHandler}
                className={`inline-flex w-full justify-center rounded-md ${
                  isCompleted ? "bg-green-500" : "bg-red-600"
                } px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                  isCompleted ? "hover:bg-green-700" : "hover:bg-red-700"
                } sm:ml-3 sm:w-auto`}
              >
                {!isCompleted ? "Delete" : "Yes"}
              </button>
              <button
                type="button"
                onClick={() => setShow(false)}
                className={`mt-3 inline-flex w-full justify-center rounded-md ${
                  isCompleted ? "bg-red-400" : "bg-white"
                } px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                  !isCompleted ? "hover:bg-gray-200" : "hover:bg-red-600"
                } sm:mt-0 sm:w-auto`}
              >
                {!isCompleted ? "Cancel" : "No"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
