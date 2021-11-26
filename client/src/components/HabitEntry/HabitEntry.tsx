import { useRecoilValue } from "recoil";
import { timescaleAtom } from "state/timescale";
import "./HabitEntry.scss";
import DailyEntry from "components/HabitEntry/DailyEntry";
import { Timestep } from "types/time";
import { CompletionInstanceProps } from "types/CompletionInstance";

const timescaleToEntryComponentMap = {
    day: DailyEntry,
};

export function mapTimescaleToEntryComponent(timescale: Timestep) {
    return timescaleToEntryComponentMap[timescale];
}

/**
 * Given a list of completionEntries, render a kind of completion mini-map
 * (a la GitHub contribution history), where each box represents a single day.
 *
 * Clicking a box brings up a DailyEntry instance, probably in the form of some kind of modal.
 *
 * Different items are rendered depending on `timestep` state:
 * - DailyEntry is the simplest, just instantiate a list of fully functional CompletionInstances
 * - MonthlyEntry will probably be quite similar to WeeklyEntry,
 *      the main difference being that a WeeklyEntry fits in a single line,
 *      whereas a MonthlyEntry is split into multiple lines -- one line per week, like a calendar
 *
 * YearlyEntry will have to be different, as it's much too visually cluttering to have a multiple
 * of 365 entries displayed on-screen PER HABIT at the same time. Perhaps we could do a counter,
 * like a single box displaying e.g. 165/365, indicating that the habit was succesfully completed
 * e.g. 165 days in a given year
 */

const HabitEntry = ({
    completionEntries,
}: {
    completionEntries: CompletionInstanceProps[][];
}) => {
    const base = "HabitEntry";
    const timescale = useRecoilValue(timescaleAtom);
    const EntryComponent = mapTimescaleToEntryComponent(timescale) as typeof DailyEntry;

    return (
        <span className={`${base} ${timescale === "week" ? "__weekly" : ""}`}>
            <EntryComponent completionEntries={completionEntries} />
        </span>
    );
};

export default HabitEntry;
