import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TodoList from './TodoList';
import TaskDetail from './TaskDetail';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodos(response.data.slice(0, 20)); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError('Failed to load todos.');
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Todo List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Routes>
            <Route path="/" element={<TodoList todos={todos} />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/404" element={<h2>404 - Not Found</h2>} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;


