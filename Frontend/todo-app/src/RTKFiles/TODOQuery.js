import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../firebaseConfig";

const todo_api = createApi({
  reducerPath: "todo_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    prepareHeaders: async (headers, { getState }) => {
      try {
        const id_token = await auth.currentUser.getIdToken(true);
        headers.set("Authorization", id_token);
      } catch (error) {
        headers.set("Authorization", "");
      }
    },
  }),
  tagTypes: ["TODO"],
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => ({
        url: "/data",
      }),
      providesTags: ["TODO"],
    }),
    addTodo: build.mutation({
      query: (body) => ({
        url: "/data",
        method: "POST",
        body: body,
      }),
      async onQueryStarted({ todo }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            todo_api.util.updateQueryData("getTodos", undefined, (draft) => {
              draft["todos"] = [data, ...draft["todos"]];
            })
          );
        } catch (error) {
          dispatch(todo_api.util.invalidateTags(["TODO"]));
        }
      },
    }),
    deleteTodo: build.mutation({
      query: (body) => ({
        url: `/data/${body?.todoId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ todoId }, { dispatch, queryFulfilled }) {
        try {
          dispatch(
            todo_api.util.updateQueryData("getTodos", undefined, (draft) => {
              const filtered_todos = draft["todos"].filter(
                (todo) => todo?.todoId !== todoId
              );
              draft["todos"] = filtered_todos;
            })
          );
          await queryFulfilled;
        } catch (error) {
          dispatch(todo_api.util.invalidateTags(["TODO"]));
        }
      },
    }),
    updateTodo: build.mutation({
      query: (body) => ({
        url: `/data/${body?.todoId}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted({ todoId, markCompleted }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            todo_api.util.updateQueryData("getTodos", undefined, (draft) => {
              const updated_todos = draft["todos"].map((todo) => {
                if (todo.todoId === todoId) return data;
                else return todo;
              });
              draft["todos"] = updated_todos;
            })
          );
        } catch (error) {
          // dispatch(todo_api.util.invalidateTags(["TODO"]));
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todo_api;

export default todo_api;
