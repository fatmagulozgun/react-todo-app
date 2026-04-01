import React, { useContext, useMemo, useState } from "react";
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import { FaCheck, FaEdit, FaRegCircle, FaRegCheckCircle, FaTimes } from "react-icons/fa";
import { TodoContext } from "../context/TodoContext";
import { REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO } from "../context/action.types";
import "bootstrap/dist/css/bootstrap.min.css";

const Todos = () => {
    const { todos, filteredTodos, dispatch } = useContext(TodoContext);
    const list = filteredTodos ?? todos;
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState("");

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditingValue(todo.todoString ?? "");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingValue("");
    };

    const saveEdit = (todoId) => {
        const next = editingValue.trim();
        if (!next) return;
        dispatch({ type: UPDATE_TODO, payload: { id: todoId, todoString: next } });
        cancelEdit();
    };

    const emptyStateText = useMemo(() => {
        if (todos.length === 0) return "Henüz yapılacak yok. İlk görevi ekleyin.";
        if (list.length === 0) return "Bu filtre/arama için sonuç bulunamadı.";
        return "";
    }, [todos.length, list.length]);

    return (
        <ListGroup className="todo-items">
            {emptyStateText ? (
                <ListGroupItem className="todo-empty">{emptyStateText}</ListGroupItem>
            ) : null}

            {list.map(todo => {
                const isEditing = editingId === todo.id;
                return (
                    <ListGroupItem
                        key={todo.id}
                        className={`todo-item ${todo.completed ? "todo-completed" : ""}`}
                    >
                        <button
                            type="button"
                            className="todo-toggle"
                            aria-label={todo.completed ? "Tamamlanmadı olarak işaretle" : "Tamamlandı olarak işaretle"}
                            onClick={() => dispatch({ type: TOGGLE_TODO, payload: todo.id })}
                        >
                            {todo.completed ? <FaRegCheckCircle /> : <FaRegCircle />}
                        </button>

                        <div className="todo-content">
                            {isEditing ? (
                                <Input
                                    value={editingValue}
                                    onChange={e => setEditingValue(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") saveEdit(todo.id);
                                        if (e.key === "Escape") cancelEdit();
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span className="todo-text">{todo.todoString}</span>
                            )}
                        </div>

                        <div className="todo-actions">
                            {isEditing ? (
                                <>
                                    <Button color="success" size="sm" onClick={() => saveEdit(todo.id)}>
                                        <FaCheck />
                                    </Button>
                                    <Button color="secondary" size="sm" outline onClick={cancelEdit}>
                                        <FaTimes />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button color="secondary" size="sm" outline onClick={() => startEdit(todo)}>
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        outline
                                        onClick={() => dispatch({ type: REMOVE_TODO, payload: todo.id })}
                                    >
                                        <FaTimes />
                                    </Button>
                                </>
                            )}
                        </div>
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
};

export default Todos;
