import { useMutation } from "react-query";
import axios from 'axios';

type Credentials = {
    username: string,
    password: string,
}

async function login(credentials: Credentials) {
    const response = await axios.post('/api/login', credentials);
    return response.data;
}

export function useLoginMutation() {
    return useMutation('loginQuery', login);
};