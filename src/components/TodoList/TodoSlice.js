import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// với redux toolkit thì file action đã được gộp lại reducer
const todoSlice = createSlice({
  name: "todoList", // được coi như là tên mảng
  initialState: { status: "idle", todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const currentTodo = state.find((todo, index) => index === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    },
  }, // tự tạo action todoList/toggleTodo

  // xử lí action được tạo ra bởi createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.status = "idle";
      state.todos = action.payload;
    });
    builder.addCase(addTodoThunk.fulfilled, (state, action) => {
      state.status = "idle";
      state.todos.push(action.payload);
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.status = "idle";
      const currentTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    });
  },
});

export default todoSlice;

export const fetchTodo = createAsyncThunk("todos/fetchTodo", async () => {
  const res = await fetch("api/todos");
  const data = await res.json();
  return data.todos;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (toggle) => {
    // đoạn này là add dữ liệu vào api
    const res = await fetch("api/updateTodo", {
      method: "POST",
      body: JSON.stringify(toggle),
    });
    const data = await res.json();
    // trả ra để thực hiện action

    return data.todos.id;
  }
);

export const addTodoThunk = createAsyncThunk(
  "todos/addTodoThunk",
  async (newTodo) => {
    // đoạn này là add dữ liệu vào api
    const res = await fetch("api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    });
    const data = await res.json();
    // trả ra để thực hiện action
    return data.todos;
  }
);

//  tạo ra 3 action
//  1.todos/fetchTodo/pending
//  2.todos/fetchTodo/fulfilled
//  3.todos/fetchTodo/rejected

// // tạo ra một thunk action creator trả về một thunk action
// export function addTodos(todo) {
//   return function addTodosThunk(dispatch, getState) {
//     //custom lại dữ liệu được trigger từ ui và gửi dispatch thật sự
//     todo.name = "le huynh huy";
//     dispatch(todoSlice.actions.addTodo(todo));
//     console.log("««««« state »»»»»", getState());
//     console.log("««««« todo »»»»»", todo);
//   };
// }
