import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../features/tasks/tasksSlice';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const TaskForm = ({ closeModal, existingTask }) => {
  const dispatch = useDispatch();
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Validation State
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
    }
  }, [existingTask]);

  // Validate inputs
  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Title is required.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!description.trim()) {
      setDescriptionError('Description is required.');
      isValid = false;
    }  else {
      setDescriptionError('');
    }

    return isValid;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return; // Prevent submission if validation fails
  
    try {
      if (existingTask) {
        await dispatch(updateTask({ id: existingTask.id, title, description })).unwrap();
        toast.success('Task updated successfully!'); // Success message
      } else {
        await dispatch(addTask({ title, description, completed: false })).unwrap();
        toast.success('Task added successfully!'); // Success message
      }
  
      closeModal(); // Close modal only if successful
    } catch (error) {
      toast.error(`Error: ${error.message || 'Something went wrong!'}`); // Error message
    }
  };
  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        {existingTask ? 'Update Task' : 'Add a New Task'}
      </Typography>

      {/* Task Title Field */}
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (titleError) validateForm(); // Clear error immediately
        }}
        fullWidth
        variant="outlined"
        error={!!titleError}
        helperText={titleError}
        onBlur={validateForm} // Validate when user leaves the input
      />

      {/* Task Description Field */}
      <TextField
        label="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (descriptionError) validateForm(); // Clear error immediately
        }}
        fullWidth
        multiline
        rows={2}
        variant="outlined"
        error={!!descriptionError}
        helperText={descriptionError}
        onBlur={validateForm} // Validate when user leaves the input
      />

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={closeModal}>Cancel</Button>
        <Button 
          type="submit" 
          variant="contained"
          disabled={!!titleError || !!descriptionError} 
        >
          {existingTask ? 'Update' : 'Add Task'}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;