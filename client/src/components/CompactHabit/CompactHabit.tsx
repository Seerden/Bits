import HabitEntry from "components/HabitEntry/HabitEntry";
import './CompactHabit.scss';

type HabitProps = {  // @todo: implement actual type
    name: string,
    description?: string,
    completion: any[]
}


const CompactHabit = ({ name, completion }: HabitProps) => {
    const base = "CompactHabit";
    
    const completionEntries = completion.map(entry => <HabitEntry data={entry} />)

    return (
        <div className={`${base}`}>
            <span className={`${base}__name`}>
                { name }
            </span>
            <span className={`${base}__completion`}>
                { completionEntries }
            </span>
        </div>
    )
}

export default CompactHabit