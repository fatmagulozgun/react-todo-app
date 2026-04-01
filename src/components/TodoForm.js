import React, { useContext, useState } from 'react'
import { Form, FormGroup, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'
import { v4 } from 'uuid'
import { TodoContext } from '../context/TodoContext'
import { ADD_TODO } from '../context/action.types'

const TodoForm = () => {
    const [todoString, setTodoString] = useState("");
    const { dispatch } = useContext(TodoContext);

    const handleSubmit = e => {
        e.preventDefault();
        const text = todoString.trim();
        if (text === "") return alert("Lütfen bir yapılacak girin.");
        const todo = {
            todoString: text,
            id: v4(),
            completed: false,
            createdAt: Date.now()
        };
        dispatch({
            type: ADD_TODO,
            payload: todo
        });
        setTodoString("");
    }

    return (
        <Form onSubmit={handleSubmit} className="todo-form">
            <FormGroup>
                <InputGroup>
                    <Input
                        type="text"
                        name="todo"
                        id="todo"
                        placeholder="Yeni yapılacak ekle..."
                        value={todoString}
                        onChange={e => setTodoString(e.target.value)}
                    />
                    <InputGroupAddon addonType="prepend">
                        <Button
                            color="primary"
                        >
                            Ekle
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </Form>
    )
}

export default TodoForm