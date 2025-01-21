import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

// Fetch all tasks
export const fetchTasksAPI = async () => {
  const response = await axios.get(API_URL);
  console.log("🚀 ~ fetchTasksAPI ~ response:", response)
  return response.data;
};

// Add a new task
export const addTaskAPI = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Update a task
export const updateTaskAPI = async (id, updatedTask) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return response.data;
};

// Delete a task
export const deleteTaskAPI = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};


export const toggleTaskCompletedAPI = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/toggle`);
  return response.data;
};