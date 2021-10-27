import { useRecoilState } from "recoil";
import { currentUserAtom } from "state/auth";

export function useAuth() {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    return [currentUser, setCurrentUser] as const;
}