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
    const createList = (name: string) => api.post('/lists', {name});
    const deleteList = (id: string) => api.delete(`/lists/${id}`);

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
        <div className="lists-page">
            <h2>My Lists</h2>
            <form onSubmit={handleCreateList}>
                <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="New list name"
                    required
                />
                <button type="submit">Create List</button>
            </form>
            <ul>
                {lists?.map((list) => (
                    <li key={list.id}>
                        {list.name}
                        <button onClick={() => navigate(`/lists/${list.id}`)}>View</button>
                        <button onClick={() => handleDeleteList(list.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListsPage;
