import {
    ADD_TODO,
    CLEAR_COMPLETED,
    REMOVE_TODO,
    SET_TODOS,
    TOGGLE_TODO,
    UPDATE_TODO
} from './action.types';

const todoReducer = (state, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload]
        case SET_TODOS:
            return Array.isArray(action.payload) ? action.payload : state
        case TOGGLE_TODO:
            return state.map(todo =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        case UPDATE_TODO:
            return state.map(todo =>
                todo.id === action.payload?.id
                    ? { ...todo, todoString: action.payload?.todoString ?? todo.todoString }
                    : todo
            )
        case CLEAR_COMPLETED:
            return state.filter(todo => !todo.completed)
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.payload)
        default:
            return state
    }
}

export default todoReducer;