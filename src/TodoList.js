import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodos(response.data.slice(0, 20)); 
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Link to={`/task/${todo.id}`}>
            {todo.title.length > 20 ? `${todo.title.substring(0, 17)}...` : todo.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

