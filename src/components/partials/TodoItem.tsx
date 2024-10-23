// src/components/TodoItem.tsx
import React from 'react';

interface TodoItemProps {
    todo: any;
    onToggle: (todo: any) => void;
    onDelete: (todoId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({todo, onToggle, onDelete}) => {
    return (
        <li className="todo-item flex items-center justify-between p-2 border-b border-gray-200">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo)}
                className="mr-2"
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
            </span>
            <button
                onClick={() => onDelete(todo.id)}
                className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-700"
            >
                Delete
            </button>
        </li>
    );
};

export default TodoItem;