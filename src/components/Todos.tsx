import { GetTodosData } from "../utils/types";
import Empty from "./Empty";
import Spinner from "./Spinner";
import Todo from "./Todo";
import { useQuery } from "@apollo/client";
import todosOpertaion from "../graphql/operations/todos";
import useToast from "../hooks/useToast";
import actionTypes from "../state/actionTypes";
import { useEffect } from "react";
import useCustomContext from "../hooks/useCustomContext";

interface Props {}

const Todos: React.FC<Props> = ({}) => {
  const { state, dispatch } = useCustomContext()
  const { showToast } = useToast();
  const { data, loading, error } = useQuery<GetTodosData, null>(
    todosOpertaion.Queries.getTodos
  );
  const todos = state.todos;
  if (error) showToast("failed to load todos", "error");
  useEffect(() => {
    if (data?.getTodos) {
      dispatch({
        type: actionTypes.SET_TODOS,
        payload: { todos: data.getTodos },
      });
    }
  }, [data, dispatch]);
  return (
    <section className="mt-8 flex flex-col justify-center items-center space-y-4">
      {loading ? (
        <Spinner />
      ) : error || !todos || !todos.length ? (
        <Empty />
      ) : (
        todos.map((todo) => <Todo key={todo.id} todo={todo} />)
      )}
    </section>
  );
};

export default Todos;
