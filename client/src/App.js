import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskListPage from './Components/TaskListPage/TaskListPage';
import TaskFormPage from './Components/TaskForm/TaskForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskListPage/>} />
        <Route path="/task-form" element={<TaskFormPage/>} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
