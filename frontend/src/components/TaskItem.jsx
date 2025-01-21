import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskCompleted, deleteTask } from '../features/tasks/tasksSlice';
import { Card, CardContent, Typography, Checkbox, Button, Box, Modal } from '@mui/material';
import TaskForm from './TaskFrom';
import DeleteConfirmation from './DeleteConfirmation';
import { toast } from 'react-toastify';


const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
  
    const handleDelete = async () => {
      try {
        await dispatch(deleteTask(task.id)).unwrap(); // Ensure the async operation completes
        toast.success('Task deleted successfully!'); // Success message
        setOpenDelete(false); // Close dialog only if deletion is successful
      } catch (error) {
        toast.error(`Error: ${error.message || 'Failed to delete task!'}`); // Show error message
      }
    };
  
    return (
      <>
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': { boxShadow: 3, backgroundColor: '#f1f1f1' }
          }}
        >
          <Checkbox 
            checked={task.completed} 
            onChange={() => dispatch(toggleTaskCompleted(task.id))} 
            sx={{ color: task.completed ? 'green' : 'primary' }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ textDecoration: task.completed ? 'line-through' : 'none', fontWeight: 'bold', color: '#333' }}
            >
              {task.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>{task.description}</Typography>
          </CardContent>
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }} >
            <Button onClick={() => setOpenEdit(true)} color="primary">
              Edit 
            </Button>
            <Button onClick={() => setOpenDelete(true)} color="error">
              Delete
            </Button>
          </Box>
        </Card>
  
        {/* Modal for Updating Task */}
        <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'white',
              boxShadow: 24,
              p: 3,
              borderRadius: 2
            }}
          >
            <TaskForm closeModal={() => setOpenEdit(false)} existingTask={task} />
          </Box>
        </Modal>
  
        {/* Delete Confirmation Dialog (Reusable Component) */}
        <DeleteConfirmation 
          open={openDelete} 
          onClose={() => setOpenDelete(false)} 
          onConfirm={handleDelete} 
          itemName={task.title} 
        />
      </>
    );
  };
  
  export default TaskItem;
