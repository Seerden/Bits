import axios from 'axios';
import { useQuery } from 'react-query';

async function fetchUsers() {
    return await axios.get('/api/db/users')
}

export function useFetchUsers () {
    const response = useQuery('fetchUsers', fetchUsers);
    return response;
}