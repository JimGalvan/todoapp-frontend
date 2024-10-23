import {useQuery} from '@tanstack/react-query';
import api from '../api/api';
import {TodoList} from '../types/TodoList';

export const useLists = () => {
    return useQuery<TodoList[], Error>({
        queryKey: ['lists'],
        queryFn: async () => {
            const {data} = await api.get('/lists');
            return data;
        }
    });
};