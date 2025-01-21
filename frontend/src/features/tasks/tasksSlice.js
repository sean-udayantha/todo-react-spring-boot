import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTaskAPI, deleteTaskAPI, fetchTasksAPI, toggleTaskCompletedAPI, updateTaskAPI } from '../../services/taskService';


// Fetch all tasks from the backend
export const getTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetchTasksAPI();
  return response;
});


// Add a new task
export const addTask = createAsyncThunk('taskApi/addTask', async (task) => {
    const response =await addTaskAPI(task);
    return response;
  });
  
  // Update a task
  export const updateTask = createAsyncThunk('taskApi/updateTask', async ({ id, title, description, completed }) => {
    const response = await updateTaskAPI(id, { title, description, completed });
    return response;
  });
  
  // Toggle task completion
  export const toggleTaskCompleted = createAsyncThunk('taskApi/toggleTaskCompleted', async (id) => {
    const response = await toggleTaskCompletedAPI(id);
    return response;
  });
  
  // Delete a task
  export const deleteTask = createAsyncThunk('taskApi/deleteTask', async (id) => {
    const response = await deleteTaskAPI(id);
    return response;
  });

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // toggleTaskCompleted: (state, action) => {
    //     const task = state.tasks.find((task) => task.id === action.payload);
    //     if (task) {
    //         task.completed = !task.completed;
    //     }
    // },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(toggleTaskCompleted.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  }
});
// export const { toggleTaskCompleted} = tasksSlice.actions;
export default tasksSlice.reducer;
