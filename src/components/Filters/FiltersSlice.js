import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// với redux toolkit thì file action đã được gộp lại reducer
export default createSlice({
  name: "filter",
  initialState: {
    status: "idle",
    filters: {},
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
  extraReducers: (builder) => {
    builder.addCase(getFilter.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getFilter.fulfilled, (state, action) => {
      state.status = "idle";
      state.filters = action.payload;
    });

    builder.addCase(searchTextThunk.fulfilled, (state, action) => {
      state.status = "idle";
      state.filters.search = action.payload;
    });

    builder.addCase(searchPriorityThunk.fulfilled, (state, action) => {
      state.status = "idle";
      state.filters.priority = action.payload;
    });

    builder.addCase(searchStatusThunk.fulfilled, (state, action) => {
      state.status = "idle";
      state.filters.status = action.payload;
    });
  },
});

export const getFilter = createAsyncThunk("filters/getFilter", async () => {
  const res = await fetch("api/filters");
  const data = await res.json();
  return data.filters[0];
});

export const searchTextThunk = createAsyncThunk(
  "filters/searchTextThunk",
  async (searchText) => {
    const res = await fetch("api/searchText", {
      method: "POST",
      body: JSON.stringify(searchText),
    });
    const data = await res.json();
    return data.filters.search;
  }
);

export const searchPriorityThunk = createAsyncThunk(
  "filters/searchPriorityThunk",
  async (searchPriority) => {
    const res = await fetch("api/searchPriority", {
      method: "POST",
      body: JSON.stringify(searchPriority),
    });
    const data = await res.json();
    return data.filters.priority;
  }
);

export const searchStatusThunk = createAsyncThunk(
  "filters/searchStatusThunk",
  async (searchStatus) => {
    const res = await fetch("api/searchStatus", {
      method: "POST",
      body: JSON.stringify(searchStatus),
    });
    const data = await res.json();
    console.log("««««« search status »»»»»", data.filters.status);

    return data.filters.status;
  }
);
