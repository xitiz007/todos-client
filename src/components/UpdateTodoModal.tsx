import { XMarkIcon } from "@heroicons/react/24/solid";
import Spinner from "./Spinner";
import { useMutation } from "@apollo/client";
import todosOperations from "../graphql/operations/todos";
import useToast from "../hooks/useToast";
import useCustomContext from "../hooks/useCustomContext";
import { TodoType, UpdateTodoData, UpdateTodoVariables } from "../utils/types";
import React, { useEffect, useState } from "react";
import actionTypes from "../state/actionTypes";

interface Props {
  todo: TodoType;
  closeModal: () => void;
}

const ConfirmationDelete: React.FC<Props> = ({ closeModal, todo }) => {
  const [updatedTodo, setUpdatedTodo] = useState<TodoType>(todo);
  const { dispatch } = useCustomContext();
  const { showToast } = useToast();
  const [updateTodo, { data, loading, error }] = useMutation<
    UpdateTodoData,
    UpdateTodoVariables
  >(todosOperations.Mutations.updateTodo);
  const onTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUpdatedTodo((todo) => ({ ...todo, title: event.target.value }));
  const onCompletedChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdatedTodo((todo) => ({ ...todo, completed: event.target.checked }));
  };
  if (error) showToast("failed to upload todo", "error");
  const updateHandler = (event: React.FormEvent) => {
    event.preventDefault();
    updateTodo({
      variables: {
        id: updatedTodo.id,
        completed: updatedTodo.completed,
        title: updatedTodo.title,
      },
    });
  };
  useEffect(() => {
    const success = data?.updateTodo.success;
    if (success) {
      showToast("todo was updated", "success");
      dispatch({
        type: actionTypes.UPDATE_TODO,
        payload: { updatedTodo },
      });
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);

  return (
    <div
      className="relative z-20"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-700 bg-opacity-70 transition-opacity"></div>
      <div className="fixed z-20 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg shadow-xl  transform transition-all max-w-4xl p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl lg:text-2xl font-semibold text-black">
                Update Todo
              </h3>
              <div
                onClick={closeModal}
                className="rounded-full hover:bg-gray-200 transition duration-200 ease-out p-1 cursor-pointer"
              >
                <XMarkIcon className="w-7 text-black font-bold" />
              </div>
            </div>
            <div className="border my-4" />
            <div className="w-[300px] md:w-[500px]">
              <form
                onSubmit={updateHandler}
                className="w-full flex flex-col space-y-2"
              >
                <input
                  required
                  value={updatedTodo.title}
                  onChange={onTitleChangeHandler}
                  type="text"
                  placeholder="Update your todo..."
                  className="p-2 bg-transparent outline-none border border-gray-400 rounded-sm focus-within:border-blue-400 text-gray-900 text-base md:text-lg lg:text-xl"
                />
                <div className="flex items-center space-x-2">
                  <input
                    onChange={onCompletedChangeHandler}
                    checked={updatedTodo.completed}
                    type="checkbox"
                    id="completed"
                  />
                  <label
                    className="text-gray-900 font-medium text-sm sm:text-base tracking-wide"
                    htmlFor="completed"
                  >
                    Completed
                  </label>
                </div>
                <div className="flex flex-col space-y-4 mt-4 px-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="tracking-wider bg-green-600 flex justify-center py-3 rounded-full font-semibold text-base text-white hover:bg-green-500 transition duration-200 ease-out"
                  >
                    {loading ? <Spinner /> : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={loading}
                    className="tracking-wider border border-gray-300 py-3 rounded-full font-semibold text-base text-black hover:bg-gray-100 transition duration-200 ease-out"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDelete;
