import axios from "axios";
import { useMutation } from "react-query";

async function postUser(newUser) {
    try {
        return await axios.post('/api/db/user', newUser)
    } catch (error) {
        console.error
    }
}

export function usePostUser() {
    return useMutation<any, any, any>('postUser', (newUser) => postUser(newUser));
}