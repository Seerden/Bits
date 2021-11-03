import DailyEntry from "components/HabitEntry/DailyEntry";
import MonthlyEntry from "components/HabitEntry/MonthlyEntry";
import WeeklyEntry from "components/HabitEntry/WeeklyEntry";
import YearlyEntry from "components/HabitEntry/YearlyEntry";
import { Timestep } from "types/time";

const timescaleToEntryComponentMap = {
    day: DailyEntry,
    week: WeeklyEntry,
    month: MonthlyEntry,
    year: YearlyEntry
};

export function mapTimescaleToEntryComponent(timescale: Timestep) {
    return timescaleToEntryComponentMap[timescale];
}