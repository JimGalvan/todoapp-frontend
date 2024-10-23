import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

interface AuthState {
    userId: string | null;
    token: string | null;
    setUserId: (userId: string) => void;
    clearUserId: () => void;
    setToken: (token: string) => void;
    clearToken: () => void;
}


export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                userId: null,
                token: null,
                setUserId: (userId: string) => set({userId}),
                clearUserId: () => set({userId: null}),
                setToken: (token: string) => set({token}),
                clearToken: () => set({token: null}),
            }),
            {
                name: 'auth-storage',
            }
        )
    ));