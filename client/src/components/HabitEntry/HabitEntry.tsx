import HabitToggleInstance from "components/HabitInstance/HabitToggleInstance";
import './HabitEntry.scss';

type HabitEntryProps = {
    data: boolean[]  // @todo: to-be-implemented once shape of API return is decided
}

const HabitEntry = ({ data }: HabitEntryProps) => {
    const base = "HabitEntry";
    
    // const completionInstances = data.map(entry => 
    //     <HabitToggleInstance 
    //         startsChecked={entry} 
    //         date={new Date()}
    //         index={0}
    //         habitId={'1'}
    //     />
    // )
    const a = 1;
    return (
        <div className={`${base}`}>
            {/* {completionInstances} */}
        </div>
    )
}

export default HabitEntry