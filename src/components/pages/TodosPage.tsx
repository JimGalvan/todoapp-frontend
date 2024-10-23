// src/components/pages/TodosPage.tsx
import React, {useState} from 'react';
import {useTodos} from '../../hooks/useTodos';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../../api/api';
import {useParams} from 'react-router-dom';
import TodoItem from '../partials/TodoItem';

const TodosPage: React.FC = () => {
    const {id: listId} = useParams<{ id: string }>();
    const {data: todos, isLoading, error} = useTodos(listId!);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const queryClient = useQueryClient();
    const createTodo = (title: string, listId: string | undefined) => api.post(`/todo-lists/${listId}/todo`, {title});
    const deleteTodo = (todoId: string, listId: string | undefined) => api.delete(`/todo-lists/${listId}/todo/${todoId}`);
    const toggleTodo = (todo: any, listId: string | undefined) => api.put(`/todo-lists/${listId}/todo/${todo.id}`, {
        completed: !todo.completed,
    });

    const createTodoMutation = useMutation({
        mutationFn: (title: string) => createTodo(title, listId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos', listId]});
            setNewTodoTitle('');
        },
    });

    const deleteTodoMutation = useMutation({
        mutationFn: (todoId: string) => deleteTodo(todoId, listId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos', listId]});
        },
    });

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
        <div className="todo-page p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-center">Todos</h2>
            <form onSubmit={handleCreateTodo} className="flex space-x-2">
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="New todo title"
                    required
                    className="flex-grow p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Add Todo
                </button>
            </form>
            <ul className="space-y-2">
                {todos?.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodosPage;