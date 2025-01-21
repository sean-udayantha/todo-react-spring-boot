import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../features/tasks/tasksSlice';
import TaskItem from './TaskItem';
import { CircularProgress, List, Typography, Paper, Box } from '@mui/material';
import { toast } from 'react-toastify';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state) => state.tasks);
  console.log("🚀 ~ TaskList ~ status:", status)
  console.log("🚀 ~ TaskList ~ tasks:", tasks)

  // useEffect(() => {
  //   dispatch(getTasks());
  // }, [dispatch]);

  const fetchTasks = useCallback(async () => {
    try {
      await dispatch(getTasks()).unwrap();
    } catch (error) {
      toast.error(`Error: ${error.message || 'Failed to load tasks!'}`);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); 

  if (status === 'loading') {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  }

  if (tasks.length === 0) {
    return <Typography sx={{ textAlign: 'center', mt: 3, color: 'gray' }}>No tasks available</Typography>;
  }

  return (
    <Paper 
      elevation={3} 
      sx={{
        p: 3,
        mt: 2,
        borderRadius: 2,
        maxWidth: 600,
        mx: 'auto',
        backgroundColor: '#f5f5f5',
        height: 600, 
        overflowY: 'auto', /* Enable vertical scrolling */
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
        Task List
      </Typography>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
