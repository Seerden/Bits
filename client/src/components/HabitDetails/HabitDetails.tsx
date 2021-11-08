import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";
import cs from './HabitDetails.module.scss';

const HabitDetails = (props: Partial<Habit & Completion>) => {
    return (
        <div className={cs.HabitDetails}>
            Hey
        </div>
    )
}

export default HabitDetails