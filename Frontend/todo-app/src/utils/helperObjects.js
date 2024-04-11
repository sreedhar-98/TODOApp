import { sortTodosByCompletedDate, sortTodosByPriority } from "./SortTodos";

export const sortFunctions = {
  priorityhigh: (data) => sortTodosByPriority(data, true),
  prioritylow: (data) => sortTodosByPriority(data, false),
  completedhigh: (data) => sortTodosByCompletedDate(data, true),
  completedlow: (data) => sortTodosByCompletedDate(data, false),
};
