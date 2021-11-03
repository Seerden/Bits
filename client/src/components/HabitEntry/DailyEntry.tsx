import CompletionInstance from "components/HabitInstance/CompletionInstance";

const DailyEntry = ({ completionEntries }) => {
    const base = "DailyEntry";
    
    return (
        <ul className={`${base}`}>
            {completionEntries.map(entry => <CompletionInstance {...entry} />)}
        </ul>
    )
}

export default DailyEntry