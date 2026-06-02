import { api } from '@/services/api';

export type UserMe = { 
    id: number;
    username: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
};

export async function getMe() { 
    const response = await api.get<UserMe>("me/");
    return response.data;
}