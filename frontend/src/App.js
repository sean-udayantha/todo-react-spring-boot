import React, { useEffect } from 'react';
import MainPage from './page/MainPage';
import { getTasks } from './features/tasks/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  
  // const dispatch = useDispatch();
  // const { tasks, status } = useSelector((state) => state.tasks);
  // useEffect(() => {
  //   dispatch(getTasks());
  // }, [dispatch]);
  return (
  
    <>
    <MainPage/>
    </>
  );
}

export default App;
