import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import todosOperation from "../graphql/operations/todos";
import Spinner from "./Spinner";
import useToast from "../hooks/useToast";
import { CreateTodoData, CreateTodoVariables } from "../utils/types";
import useCustomContext from "../hooks/useCustomContext";
import actionTypes from "../state/actionTypes";

const AddTodo: React.FC = ({}) => {
  const { dispatch } = useCustomContext();
  const todoRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const [createTodo, { data, loading, error }] = useMutation<
    CreateTodoData,
    CreateTodoVariables
  >(todosOperation.Mutations.createTodo);
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const title = todoRef.current?.value;
    if (!title || !title.trim())
      return showToast("title cannot be left empty", "error");
    createTodo({ variables: { title } });
  };
  if (error) showToast("failed to add todo", "error");
  useEffect(() => {
    if (data?.createTodo) {
      showToast("todo was added", "success");
      if (todoRef.current) {
        todoRef.current.value = "";
      }
      dispatch({
        type: actionTypes.ADD_TODO,
        payload: { todo: data.createTodo },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);
  return (
    <div className="mt-4 flex flex-col justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative w-[300px] sm:w-[400px] md:w-[600px] flex bg-gray-100 focus-within:bg-white focus-within:border-2 focus-within:border-blue-400 transition-all duration-300 ease-in-out rounded-l-full"
      >
        <input
          required
          ref={todoRef}
          type="text"
          placeholder="Add your todo..."
          className="flex-1 pl-4 pr-2 py-2 outline-none bg-transparent text-gray-900 text-base md:text-lg lg:text-xl"
        />
        <button
          disabled={loading}
          title="Add"
          type="submit"
          className="px-2 border border-gray-300 text-black hover:bg-gray-200 transition-colors duration-200 ease-in-out"
        >
          {loading ? <Spinner /> : <PlusIcon className="w-6" />}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
