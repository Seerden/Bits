import CompletionInstance from "components/HabitInstance/CompletionInstance";
import { EntryProps } from "types/HabitEntry";
import "./DailyEntry.scss";

const DailyEntry = ({ completionEntries }: EntryProps) => {
	const base = "DailyEntry";

	return (
		<ul className={`${base}`}>
			{completionEntries.map((entry, idx) => {
                const startDate = entry[0].startDate || new Date(entry[0].created);
                return startDate > entry[0].habitEntryDate ? <></> : <CompletionInstance key={idx} entry={entry} />;
			})}
		</ul>
	);
};

export default DailyEntry;
