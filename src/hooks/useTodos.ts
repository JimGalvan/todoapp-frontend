// src/hooks/useTodos.ts
import {useQuery} from '@tanstack/react-query';
import api from '../api/api';
import {Todo} from '../types/Todo';

export const useTodos = (listId: string) => {
    return useQuery<Todo[], Error>({
        queryKey: ['todos', listId],
        queryFn: async () => {
            const {data} = await api.get(`/lists/${listId}/todos`);
            return data;
        }
    });
};