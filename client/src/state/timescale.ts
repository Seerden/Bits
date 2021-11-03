import { atom } from "recoil";
import { Timestep } from "types/time";

export const timescaleAtom = atom<Timestep>({
    key: "timescaleState",
    default: 'day'
})