import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.value = action.payload;
    },
    addNewJob: (state, action) => {
      if (state.value[0]) {
        if (state.value[0].date === action.payload.date) {
          state.value.push(action.payload);
        }
        return;
      }
      return;
    },
    removeJob: (state, action) => {
      state.value = state.value.filter((job) => job._id !== action.payload);
    },
    editJob: (state, action) => {
      const index = state.value.findIndex((job) => job._id === action.payload._id);
      state.value[index] = {
        ...state.value[index],
        ...action.payload,
      };
    },
    removeAllJobs: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setJobs, removeJob, addNewJob, editJob, removeAllJobs } = jobSlice.actions;

export default jobSlice.reducer;
