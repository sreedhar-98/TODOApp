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
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => ({
        url: "/data",
      }),
    }),
  }),
});

export const { useGetTodosQuery } = todo_api;

export default todo_api;
