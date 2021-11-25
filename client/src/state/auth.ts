import { atom } from "recoil";

type User = {
    username: string;
    userId: string;
};

export const currentUserAtom = atom<User>({
    key: "currentUser",
    default: JSON.parse(localStorage.getItem("currentUser")),
});
