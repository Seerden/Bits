import { useToggle } from 'hooks/useToggle';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleFill } from 'react-icons/ri';

import './HabitToggleInstance.scss';

type HabitInstanceProps = {
    date: Date,
    index: number,
    habitId: string
}

interface HabitToggleInstanceProps extends HabitInstanceProps {
    startsChecked: boolean    
}

interface HabitRangeInstanceProps extends HabitInstanceProps {
    rangeValue: number
}

const HabitToggleInstance = ({ startsChecked, date, index, habitId }: HabitToggleInstanceProps) => {
    const base = "HabitToggleInstance";
    const [checked, toggleChecked] = useToggle({ initial: startsChecked });

    const checkboxProps = {
        onClick: () => toggleChecked(),
        style: {
            fill: checked ? 'green' : 'grey'
        }
    }
    return (
        <div className={`${base}`}>
            {
                checked 
                ? <RiCheckboxCircleFill { ...checkboxProps }/> 
                : <RiCheckboxBlankCircleFill { ...checkboxProps }/>
            }
        </div>
    )
}

export default HabitToggleInstance