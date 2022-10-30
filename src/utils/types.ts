import ActionTypes from "../state/actionTypes";

export interface TodoType {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetTodosData {
  getTodos: Array<TodoType>;
}

// todos context api

export interface UdpatedTodo {
  id: string;
  title: string;
  completed: boolean;
}

export interface Payload {
  todoId?: string;
  todo?: TodoType;
  todos?: TodoType[];
  updatedTodo?: UdpatedTodo;
}

export interface Action {
  type: ActionTypes;
  payload: Payload;
}

export interface State {
  todos: TodoType[];
}

// mutations

export interface CreateTodoData {
  createTodo: TodoType;
}

export interface CreateTodoVariables {
  title: string;
}

export interface DeleteTodoData {
  deleteTodo: {
    success: boolean;
  };
}

export interface DeleteTodoVariables {
  id: string;
}

export interface UpdateTodoData {
  updateTodo: {
    success: boolean;
  };
}

export interface UpdateTodoVariables {
  id: string;
  title: string;
  completed: boolean;
}
