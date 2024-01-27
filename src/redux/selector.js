import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => state.todoList.todos;
export const searchTextSelector = (state) => state.filter.filters.search;
export const searchStatusSelector = (state) => state.filter.filters.status;
export const searchPrioritySelector = (state) => state.filter.filters.priority;

export const todosRemainingSelector = createSelector(
  todoListSelector,
  searchTextSelector,
  searchStatusSelector,
  searchPrioritySelector,
  (todoList, searchText, searchStatus, searchPriority) => {
    return todoList.filter((todo) => {
      if (searchStatus === "All") {
        return searchPriority.length
          ? todo.name.includes(searchText) &&
              searchPriority.includes(todo.priority)
          : todo.name.includes(searchText);
      } else
        return searchPriority.length
          ? todo.name.includes(searchText) &&
              todo.completed ===
                (searchStatus === "Completed" ? true : false) &&
              searchPriority.includes(todo.priority)
          : todo.name.includes(searchText) &&
              todo.completed === (searchStatus === "Completed" ? true : false);
    });
  }
);
