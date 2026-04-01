import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { Container } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { TodoContext } from './context/TodoContext';
import todoReducer from './context/reducer';
import TodoForm from './components/TodoForm'
import Todos from './components/Todos';
import TodoToolbar from './components/TodoToolbar';

const STORAGE_KEY = "todos_v1";

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], loadTodos)
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // ignore write errors (private mode, quota, etc.)
    }
  }, [todos]);

  const filteredTodos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return todos
      .filter(t => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return !!t.completed;
        return true;
      })
      .filter(t => (q ? String(t.todoString || "").toLowerCase().includes(q) : true));
  }, [todos, filter, query]);


  return (
    <TodoContext.Provider value={{ todos, filteredTodos, dispatch, filter, setFilter, query, setQuery }}>
      <Container className="app-shell">
        <header className="app-header">
          <h1>Yapılacaklar</h1>
          <p className="app-subtitle">Hızlı ekle, düzenle, tamamla; her şey cihazında saklanır.</p>
        </header>

        <TodoForm />
        <TodoToolbar />
        <Todos />
      </Container>
    </TodoContext.Provider>
  );
}

export default App;
