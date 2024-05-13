import React from 'react';
import { Link } from 'react-router-dom';

function TodoList({ todos }) {
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
