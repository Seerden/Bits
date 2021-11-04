import { useMutateCompletion } from 'helpers/api/mutateCompletion';
import { useToggle } from 'hooks/useToggle';
import { useEffect } from 'react';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { Completion } from '../../../../shared/types/Completion';

import './HabitToggleInstance.scss';

const HabitToggleInstance = (props: Partial<Completion>) => {
    const base = "HabitToggleInstance";
    const [checked, toggleChecked] = useToggle({ initial: props.completed });
    const { mutate } = useMutateCompletion();

    // whenever the user toggles the checkbox, POST/PUT the updated completion entry
    useEffect(() => {
        const { completionId, habitId, habitEntryDate } = props;

        // mutate({
        //     completionId,
        //     completed: checked,
        //     habitId,
        //     habitEntryDate
        // });
    }, [checked])

        const checkboxProps = {
        onClick: toggleChecked,
        style: {
            fill: checked ? 'green' : 'grey'
        }
    }
    return (
        <button
            className={`${base}`}
        >
            {
                checked
                    ? <RiCheckboxCircleFill {...checkboxProps} />
                    : <RiCheckboxBlankCircleFill {...checkboxProps} />
            }
        </button>
    )
}

export default HabitToggleInstance