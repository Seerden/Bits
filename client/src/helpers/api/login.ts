import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

type Credentials = {
    username: string;
    password: string;
};

async function login(credentials: Credentials) {
    const { data } = await axios.post("/api/login", credentials);
    return data;
}

export function useLoginMutation() {
    return useMutation<any, AxiosError, any>("loginQuery", login);
}
