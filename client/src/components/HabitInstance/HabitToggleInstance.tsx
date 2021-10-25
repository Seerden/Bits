import { useToggle } from 'hooks/useToggle';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleFill } from 'react-icons/ri';

import './HabitToggleInstance.scss';

type HabitToggleInstanceProps = {
    startsChecked: boolean,
}

const HabitToggleInstance = ({ startsChecked }: HabitToggleInstanceProps) => {
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