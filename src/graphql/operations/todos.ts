import { gql } from "@apollo/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Queries: {
    getTodos: gql`
      query getTodos {
        getTodos {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `,
  },
  Mutations: {
    createTodo: gql`
      mutation createTodo($title: String!) {
        createTodo(title: $title) {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `,
    deleteTodo: gql`
      mutation deleteTodo($id: String!) {
        deleteTodo(id: $id) {
          success
        }
      }
    `,
    updateTodo: gql`
      mutation updateTodo($id: String!, $title: String!, $completed: Boolean!) {
        updateTodo(id: $id, title: $title, completed: $completed) {
          success
        }
      }
    `,
  },
};
