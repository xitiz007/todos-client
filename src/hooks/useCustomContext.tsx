import { useContext } from "react";
import { TodoContext } from "../state/TodoProvider";

const useCustomContext = () => {
  const { state, dispatch } = useContext(TodoContext);
  return { state, dispatch };
};

export default useCustomContext;
