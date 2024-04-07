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
          const {data} = await queryFulfilled;
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
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = todo_api;

export default todo_api;
