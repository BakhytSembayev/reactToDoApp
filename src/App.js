import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TodoList from './TodoList';
import TaskDetail from './TaskDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Todo List</h1>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/404" element={<h2>404 - Not Found</h2>} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



