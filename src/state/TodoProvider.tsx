import { ReactNode, createContext, useReducer, Dispatch } from "react";
import todoReducer from "./TodoReducer";
import { Action, State } from "../utils/types";

interface MyTodoContext {
  state: State;
  dispatch: Dispatch<Action>;
}

export const TodoContext = createContext<MyTodoContext>({
  state: {
    todos: [],
  },
  dispatch: () => {},
});

const initialState = {
  todos: [],
};

interface Props {
  children: ReactNode;
}
const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
