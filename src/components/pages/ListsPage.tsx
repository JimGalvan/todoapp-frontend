// src/components/ListsPage.tsx
import React, {useState} from 'react';
import {useLists} from '../../hooks/useLists';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../../api/api';
import {useNavigate} from 'react-router-dom';

const ListsPage: React.FC = () => {
    const {data: lists, isLoading, error} = useLists();
    const [newListName, setNewListName] = useState('');
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const createList = (name: string) => api.post('/todo-lists', {name});
    const deleteList = (id: string) => api.delete(`/todo-lists/${id}`);

// Mutation to create a new list
    const createListMutation = useMutation({
        mutationFn: createList,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['lists']});
            setNewListName('');
        },
    });

// Mutation to delete a list
    const deleteListMutation = useMutation({
        mutationFn: deleteList,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['lists']});
        },
    });

    const handleCreateList = (e: React.FormEvent) => {
        e.preventDefault();
        if (newListName.trim()) {
            createListMutation.mutate(newListName);
        }
    };

    const handleDeleteList = (id: string) => {
        deleteListMutation.mutate(id);
    };

    if (isLoading) {
        return <p>Loading lists...</p>;
    }

    if (error) {
        return <p>Error loading lists: {error.message}</p>;
    }

    return (
        <div className="lists-page p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">My Lists</h2>
            <form onSubmit={handleCreateList} className="mb-6">
                <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="New list name"
                    required
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Create List
                </button>
            </form>
            <ul className="space-y-4">
                {lists?.map((list) => (
                    <li key={list.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                        <span>{list.name}</span>
                        <div className="space-x-2">
                            <button
                                    onClick={() => navigate(`/todo-lists/${list.id}`)}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                                View
                            </button>
                            <button
                                onClick={() => handleDeleteList(list.id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListsPage;
