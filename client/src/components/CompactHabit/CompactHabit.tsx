import HabitEntry from "components/HabitEntry/HabitEntry";
import { Habit } from "../../../../shared/types/Habit";
import { Completion } from "../../../../shared/types/Completion";
import './CompactHabit.scss';

type CompactHabitProps = {
    habitData: Habit,
    completionData: Completion[]
}


const CompactHabit = ({ habitData, completionData }: CompactHabitProps) => {
    const base = "CompactHabit";
    
    return (
        <div className={`${base}`}>
            
        </div>
    )
}

export default CompactHabit