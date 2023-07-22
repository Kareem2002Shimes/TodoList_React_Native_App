import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { Todo } from "../../types/app";

const todosAdapter = createEntityAdapter({
  sortComparer: (a: any, b: any) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = todosAdapter.getInitialState();

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (id) => ({
        url: `/todos/?userId=${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: any) => {
        const loadedTodos = responseData.map((todo: Todo) => {
          return todo;
        });
        return todosAdapter.setAll(initialState, loadedTodos);
      },
      providesTags: (result, error, arg): any => {
        if (result?.ids) {
          return [
            { type: "Todo", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Todo", id })),
          ];
        } else return [{ type: "Todo", id: "LIST" }];
      },
    }),
    addNewTodo: builder.mutation({
      query: (initialTodo) => ({
        url: "/todos",
        method: "POST",
        body: {
          ...initialTodo,
        },
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
    updateTodo: builder.mutation({
      query: ({ id, completed }) => ({
        url: "/todos",
        method: "PATCH",
        body: {
          id,
          completed,
        },
      }),
      invalidatesTags: (result, error, arg): any => [
        { type: "Todo", id: arg.id },
      ],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg): any => [
        { type: "Todo", id: arg.id },
      ],
    }),
    deleteAllTodos: builder.mutation({
      query: ({ userId }) => ({
        url: `/todos`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: (result, error, arg): any => [
        { type: "Todo", id: arg.userId },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddNewTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useDeleteAllTodosMutation,
} = todosApiSlice;

// // returns the query result object
// export const selectTodosResult = (
//   todosApiSlice.endpoints.getTodos as any
// ).select();

// // creates memoized selector
// const selectTodosData = createSelector(
//   selectTodosResult,
//   (todosResult) => todosResult.data // normalized state object with ids & entities
// );

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllTodos,
//   selectById: selectTodoById,
//   selectIds: selectTodoIds,
//   // Pass in a selector that returns the Todos slice of state
// } = todosAdapter.getSelectors(
//   (state) => selectTodosData(state) ?? initialState
// );
