import {useQuery} from '@tanstack/react-query';
import {useAuthStore} from "../auth/auth-store";
import api from '../api/api';
import {User} from '../types/User';

export const useUserProfile = () => {
    const userId = useAuthStore(state => state.userId);
    return useQuery<User, Error>({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const {data} = await api.get(`/users/${userId}/profile`);
            return data;
        }
    });
};