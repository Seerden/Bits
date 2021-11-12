import { Timestep } from "types/time";

type TimestepStringMap = {
	[k in Timestep]: string;
};

export const timestepDisplayStringMap: TimestepStringMap = {
	day: "daily",
	week: "weekly",
	month: "monthly",
	year: "yearly",
};

export const timesteps: Timestep[] = Array.from(
	Object.keys(timestepDisplayStringMap)
) as Timestep[];

export const getTimestepIndex = (timestep: Timestep) =>
	timesteps.findIndex((val) => val === timestep);