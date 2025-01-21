import React from 'react'
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskFrom';
const MainPage = () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
      <Container maxWidth="sm">
          <Typography variant="h4" sx={{ textAlign: 'center', my: 3, fontWeight: 'bold' }}>
            Task Manager
          </Typography>
  
          {/* Add Task Button */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => setOpen(true)}
            >
              Add Todo
            </Button>
          </Box>
  
          {/* Task List */}
          <TaskList />
  
          {/* Modal for TaskForm */}
          <Modal open={open} onClose={() => setOpen(false)}>
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
              <TaskForm closeModal={() => setOpen(false)} />
            </Box>
          </Modal>
        </Container>
      </>
    );
}

export default MainPage