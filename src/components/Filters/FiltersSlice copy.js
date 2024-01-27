import { createSlice } from "@reduxjs/toolkit";

// với redux toolkit thì file action đã được gộp lại reducer
export default createSlice({
  name: "filter",
  initialState: {
    search: "",
    status: "All",
    priority: [],
  },
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
    searchFilterStatus: (state, action) => {
      state.status = action.payload;
    },
    searchFilterPriority: (state, action) => {
      state.priority = action.payload;
    },
  },
});
