import axios, { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { NewUser, UserResponse } from "types/User";

async function postUser(newUser: NewUser) {
    const { username, password } = newUser;

    try {
        const { data } = await axios.post<
            any,
            AxiosResponse<Omit<UserResponse, "password">>
        >("/api/db/user", { username, password });
        return data;
    } catch (error) {
        console.error;
    }
}

export function usePostUser() {
    return useMutation<UserResponse, any, NewUser>("postUser", (newUser) =>
        postUser(newUser)
    );
}
