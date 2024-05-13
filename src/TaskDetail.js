import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

export default TaskDetail;

