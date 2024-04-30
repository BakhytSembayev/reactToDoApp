import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import _ from 'lodash';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [sortByAlpha, setSortByAlpha] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:5000/todos', { title: input })
      .then(response => {
        setTodos([...todos, response.data]);
        setInput('');
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  };

 const updateTodo = (id) => {
    const newTitle = prompt('Edit the todo item:');
    axios.put(`http://localhost:5000/todos/${id}`, { title: newTitle })
      .then(response => {
        setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      });
  };

  const debouncedSearch = useCallback(_.debounce((searchTerm) => {
    setSearch(searchTerm);
  }, 300), []);

  const handleSearch = (event) => {
    debouncedSearch(event.target.value);
  };

  const toggleSort = () => {
    setSortByAlpha(!sortByAlpha);
  };

  const displayedTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortByAlpha ? a.title.localeCompare(b.title) : 0);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input 
        type="text" 
        placeholder="Add new todo" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={addTodo}>Add</button>
      <input 
        type="text" 
        placeholder="Search todos" 
        onChange={handleSearch}
      />
      <button onClick={toggleSort}>Sort Alphabetically: {sortByAlpha ? 'On' : 'Off'}</button>
      <ul>
        {displayedTodos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => updateTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
