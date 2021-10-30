import { defaultUser } from "helpers/defaults/defaultUser";
import { atom } from "recoil";

export const currentUserAtom = atom({
    key: 'currentUser',
    default: defaultUser // @dev: temporary, until authentication fully implemented
});