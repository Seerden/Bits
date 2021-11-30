import { useLoginMutation } from "helpers/api/login";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "state/auth";
import { Credentials } from "types/credentials";
import type { Maybe } from "../../../shared/types/Maybe";
import type { UserWithoutPassword } from "../../../shared/types/User";

export function useAuth() {
    const [currentUser, setCurrentUser] =
        useRecoilState<Maybe<UserWithoutPassword>>(currentUserAtom);
    const { data, mutate, isSuccess, error } = useLoginMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && isSuccess) {
            setCurrentUser((c) => ({
                username: data.username,
                userId: data.userId,
            }));
            updateLocalStorageUser({
                action: "set",
                user: data,
            });
            navigate("/habits");
        }
    }, [data, isSuccess]);

    const login = useCallback(
        (credentials: Credentials) => {
            mutate(credentials);
        },
        [mutate]
    );

    const logout = () => {
        updateLocalStorageUser({ action: "remove" });
        setCurrentUser({ username: null, userId: null });
    };

    return {
        currentUser,
        login,
        logout,
        error,
    } as const;
}

type UpdateProps = {
    action: "set" | "remove";
    user?: UserWithoutPassword;
};

function updateLocalStorageUser({ action, user }: UpdateProps) {
    if (action === "set") {
        localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
        localStorage.removeItem("currentUser");
    }
}
