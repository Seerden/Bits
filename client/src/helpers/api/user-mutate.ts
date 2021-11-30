import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { NewUser, UserResponse } from "types/User";

async function postUser(newUser: NewUser) {
    const { username, password } = newUser;

    const { data } = await axios.post<any, AxiosResponse<Omit<UserResponse, "password">>>(
        "/api/db/user",
        { username, password }
    );
    return data;
}

export function usePostUser() {
    return useMutation<UserResponse, AxiosError, NewUser>("postUser", (newUser) =>
        postUser(newUser)
    );
}
