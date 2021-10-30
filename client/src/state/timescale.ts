import { atom } from "recoil";
import { Timestep } from "types/time";

export const timescaleState = atom<Timestep>({
    key: "timescaleState",
    default: 'day'
})