import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate,Navigate } from 'react-router-dom';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodos(response.data.slice(0, 20)); 
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Todo List</h1>
        <Routes>
          <Route path="/" element={
            <ul>
              {todos.map(todo => (
                <li key={todo.id}>
                  <Link to={`/task/${todo.id}`}>
                    {todo.title.length > 20 ? `${todo.title.substring(0, 17)}...` : todo.title}
                  </Link>
                </li>
              ))}
            </ul>
          } />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/404" element={<h2>404 - Not Found-страница не найдена</h2>} />
          <Route path="*" element={<h2><Navigate to="/404" replace={true}/></h2>} />
        </Routes>
      </div>
    </Router>
  );
}

function TaskDetail() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        setTodo(response.data);
      })
      .catch(() => navigate("/404"));
  }, [id, navigate]);

  return todo ? (
    <div>
      <h2>{todo.title}</h2>
      <p>ID: {todo.id}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  ) : <p>Loading...</p>;
}

export default App;


