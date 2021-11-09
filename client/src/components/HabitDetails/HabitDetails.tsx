import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";
import cs from './HabitDetails.module.scss';
import ProgressIcon from "./ProgressIcon";

const HabitDetails = (props: Partial<Habit & Completion>) => {
    return (
        <div className={cs.HabitDetails}>
            {[...Array(10).keys()].map(entry => <ProgressIcon percentage={Math.floor(Math.random()*100)} />)}
        </div>
    )
}

export default HabitDetails