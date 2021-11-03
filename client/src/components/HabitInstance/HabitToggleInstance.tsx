import { useToggle } from 'hooks/useToggle';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { Completion } from '../../../../shared/types/Completion';

import './HabitToggleInstance.scss';

const HabitToggleInstance = (props: Partial<Completion>) => {
    const base = "HabitToggleInstance";
    const [checked, toggleChecked] = useToggle({ initial: props.completed });

    const checkboxProps = {
        onClick: () => toggleChecked(),
        style: {
            fill: checked ? 'green' : 'grey'
        }
    }
    return (
        <li
            className={`${base}`}
        >
            {
                checked
                    ? <RiCheckboxCircleFill {...checkboxProps} />
                    : <RiCheckboxBlankCircleFill {...checkboxProps} />
            }
        </li>
    )
}

export default HabitToggleInstance