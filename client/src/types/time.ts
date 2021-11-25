import { Dayjs } from "dayjs";
import { TimescaleType } from "../../../shared/types/Timescale";

export type Timestep = TimescaleType["timescale"];

export type DateOrDayjs = Date | Dayjs;
