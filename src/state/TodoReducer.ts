import { State, Action, TodoType } from "../utils/types";
import ActionTypes from "./actionTypes";

const todoReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.ADD_TODO:
      const { todo } = payload as { todo: TodoType };
      return {
        ...state,
        todos: [todo, ...state.todos],
      };
    case ActionTypes.REMOVE_TODO: {
      const { todoId } = payload;
      const filteredTodos = state.todos.filter((todo) => todo.id !== todoId);
      return {
        ...state,
        todos: filteredTodos,
      };
    }
    case ActionTypes.UPDATE_TODO: {
      const { updatedTodo } = payload;
      const updatedTodos = state.todos.map((todo) =>
        todo.id === updatedTodo?.id ? { ...todo, ...updatedTodo } : todo
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case ActionTypes.SET_TODOS:
      const { todos } = payload;
      return {
        ...state,
        todos: todos || [],
      };
    default:
      return state;
  }
};

export default todoReducer;
