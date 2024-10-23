// src/components/TodoPage.tsx
import React, {useState} from 'react';
import {useTodos} from '../../hooks/useTodos';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../../api/api';
import {useParams} from 'react-router-dom';

const TodoPage: React.FC = () => {
    const {id: listId} = useParams<{ id: string }>();
    const {data: todos, isLoading, error} = useTodos(listId!);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const queryClient = useQueryClient();
    const createTodo = (title: string, listId: string | undefined) => api.post(`/lists/${listId}/todos`, {title});
    const deleteTodo = (todoId: string, listId: string | undefined) => api.delete(`/lists/${listId}/todos/${todoId}`);
    const toggleTodo = (todo: any, listId: string | undefined) => api.put(`/lists/${listId}/todos/${todo.id}`, {
        ...todo,
        isCompleted: !todo.isCompleted,
    });

// Mutation to create a new todo
    const createTodoMutation = useMutation({
        mutationFn: (title: string) => createTodo(title, listId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos', listId]});
            setNewTodoTitle('');
        },
    });

// Mutation to delete a todo
    const deleteTodoMutation = useMutation({
        mutationFn: (todoId: string) => deleteTodo(todoId, listId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos', listId]});
        },
    });

// Mutation to toggle todo completion
    const toggleTodoMutation = useMutation({
        mutationFn: (todo: any) => toggleTodo(todo, listId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos', listId]});
        },
    });

    const handleCreateTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodoTitle.trim()) {
            createTodoMutation.mutate(newTodoTitle);
        }
    };

    const handleDeleteTodo = (todoId: string) => {
        deleteTodoMutation.mutate(todoId);
    };

    const handleToggleTodo = (todo: any) => {
        toggleTodoMutation.mutate(todo);
    };

    if (isLoading) {
        return <p>Loading todos...</p>;
    }

    if (error) {
        return <p>Error loading todos: {error.message}</p>;
    }

    return (
        <div className="todo-page">
            <h2>Todos</h2>
            <form onSubmit={handleCreateTodo}>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="New todo title"
                    required
                />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos?.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => handleToggleTodo(todo)}
                        />
                        {todo.title}
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoPage;
