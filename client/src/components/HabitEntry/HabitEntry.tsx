import { mapTimescaleToEntryComponent } from 'helpers/entryComponentMap';
import { useRecoilValue } from 'recoil';
import { timescaleAtom } from 'state/timescale';
import { EntryProps } from 'types/HabitEntry';
import './HabitEntry.scss';

/**
 * Given a list of completionEntries, 
 *      render a kind of completion mini-map (a la GitHub contribution history), 
 *      where each box represents a single day.
 * 
 * Clicking a box brings up a DailyEntry instance, probably in the form of some kind of modal
 * 
 * DailyEntry is the simplest, just instantiate a list of fully functional CompletionInstances
 * 
 * MonthlyEntry will probably be quite similar, 
 *      the main difference being that a WeeklyEntry fits in a single line, 
 *      whereas a MonthlyEntry is split into multiple lines -- one line per week, like a calendar
 * 
 * YearlyEntry will have to be different, 
 *      as it's much too visually cluttering to have a multiple of 365 entries
 *      displayed on-screen PER HABIT at the same time.
 *      Perhaps we could do a counter, like a single box displaying e.g. 165/365,
 *      indicating that the habit was succesfully completed 165 days in a given year
 */

const HabitEntry = ({ completionEntries }: EntryProps) => {
    const base = "HabitEntry";
    const timescale = useRecoilValue(timescaleAtom) 
    const EntryComponent = mapTimescaleToEntryComponent(timescale);

    return (
        <span className={`${base} ${timescale === 'week' ? '__weekly' : ''}`}>
            <EntryComponent completionEntries={completionEntries} />
        </span>
    )
}

export default HabitEntry