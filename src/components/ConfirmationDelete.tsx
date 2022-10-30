import { XMarkIcon } from "@heroicons/react/24/solid";
import Spinner from "./Spinner";
import { useMutation } from "@apollo/client";
import todosOperation from "../graphql/operations/todos";
import useToast from "../hooks/useToast";
import useCustomContext from "../hooks/useCustomContext";
import { DeleteTodoData, DeleteTodoVariables } from "../utils/types";
import { useEffect } from "react";
import actionTypes from "../state/actionTypes";

interface Props {
  id: string;
  closeConfirmation: () => void;
}

const ConfirmationDelete: React.FC<Props> = ({ closeConfirmation, id }) => {
  const { dispatch } = useCustomContext();
  const { showToast } = useToast();
  const [deleteTodo, { data, loading, error }] = useMutation<
    DeleteTodoData,
    DeleteTodoVariables
  >(todosOperation.Mutations.deleteTodo);
  if (error) showToast("failed to delete todo", "error");
  const deleteHandler = () => {
    deleteTodo({ variables: { id } });
  };
  useEffect(() => {
    const success = data?.deleteTodo.success;
    if (success) {
      showToast("todo was deleted", "success");
      dispatch({
        type: actionTypes.REMOVE_TODO,
        payload: { todoId: id },
      });
      closeConfirmation();
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
                Delete Todo?
              </h3>
              <div
                onClick={closeConfirmation}
                className="rounded-full hover:bg-gray-200 transition duration-200 ease-out p-1 cursor-pointer"
              >
                <XMarkIcon className="w-7 text-black font-bold" />
              </div>
            </div>
            <div className="border my-4" />
            <div className="max-w-[320px]">
              <p className="text-center font-normal text-gray-600 text-sm">
                This can’t be undone and it will be removed from your profile.
              </p>
              <div className="flex flex-col space-y-4 mt-4 px-4">
                <button
                  onClick={deleteHandler}
                  disabled={loading}
                  className="tracking-wider bg-[#F4212E] flex justify-center py-3 rounded-full font-semibold text-base text-white hover:bg-[#C31A25] transition duration-200 ease-out"
                >
                  {loading ? <Spinner /> : "Delete"}
                </button>
                <button
                  onClick={closeConfirmation}
                  disabled={loading}
                  className="tracking-wider border border-gray-300 py-3 rounded-full font-semibold text-base text-black hover:bg-gray-100 transition duration-200 ease-out"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDelete;
