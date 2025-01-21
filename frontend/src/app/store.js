import { configureStore } from '@reduxjs/toolkit';
import tasksSliceReducer from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
   
    tasks:tasksSliceReducer,
  },
});

