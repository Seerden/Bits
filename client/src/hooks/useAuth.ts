import { useLoginMutation } from "helpers/api/loginMutation";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "state/auth";
import { Credentials } from "types/credentials";

export function useAuth() {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const { data, mutate, isSuccess } = useLoginMutation();

    useEffect(() => {
        if (data && isSuccess) {
            setCurrentUser(c => ({ 
                username: data.username,
                userId: data.userId
             }));
            updateLocalStorageUser({ 
                action: 'set', 
                username: data.username 
            })
        }
    }, [data, isSuccess])

    const login = useCallback((credentials: Credentials) => {
        mutate(credentials);
    }, [mutate]);

    const logout = () => {
        updateLocalStorageUser({ action: 'remove' });
        setCurrentUser({
            username: null,
            userId: null
        })
    };

    return {
        currentUser,
        login,
        logout
    } as const;

}

type UpdateProps = {
    action: 'set' | 'remove',
    username?: string,
}

function updateLocalStorageUser({ action, username }: UpdateProps) {
    if (action === 'set') {
        localStorage.setItem('currentUser', username);
    } else {
        localStorage.removeItem('currentUser');
    }
};