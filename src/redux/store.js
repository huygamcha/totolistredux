import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../components/Filters/FiltersSlice";
import todoSlice from "../components/TodoList/TodoSlice";

// tổng hợp các kho ở đây
const store = configureStore({
  reducer: { filter: filterSlice.reducer, todoList: todoSlice.reducer },
});

export default store;
