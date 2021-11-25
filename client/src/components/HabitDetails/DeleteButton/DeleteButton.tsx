import { useDeleteHabit } from "helpers/api/mutateHabits";
import { useToggle } from "hooks/useToggle";
import { useEffect } from "react";
import { useHabitsState } from "state/habits/habitFamily";
import cs from "../HabitDetails.module.scss";

/**
 * Button element that, on confirmation, requests the deletion of the entire habit
 * (and associated completion entries) from the API. There is an intermediate state
 * in the form of the ConfirmDelete component -- a user must confirm that they wish to
 * delete the habit to prevent accidental deletions.
 */
function DeleteButton({
    habitId,
    toggleDetails,
}: {
    habitId: string;
    toggleDetails: () => void;
}) {
    const { mutate, data } = useDeleteHabit(habitId);
    const [confirming, toggleConfirming] = useToggle({ initial: false });
    const { removeHabitFromState } = useHabitsState();

    useEffect(() => {
        // update habit(s) state on successful habit deletion
        if (data) {
            removeHabitFromState(habitId);
            toggleDetails();
        }
    }, [data]);

    function handleConfirm() {
        mutate(habitId);
    }

    return !confirming ? (
        <input
            className={cs.Delete}
            type="button"
            value="Delete habit"
            onClick={(e) => {
                e.stopPropagation();
                toggleConfirming();
            }}
        />
    ) : (
        <ConfirmDelete {...{ handleConfirm, toggleConfirming }} />
    );
}

/**
 * These two buttons are shown when a user clicks on DeleteButton.
 * - DELETE:    user wants to delete habit
 * - KEEP:      user wants to keep habit.
 */
function ConfirmDelete({ handleConfirm, toggleConfirming }) {
    return (
        <>
            <input
                onClick={(e) => {
                    e.stopPropagation();
                    handleConfirm();
                }}
                className={cs.Delete__confirm}
                type="button"
                value="DELETE"
            />
            <input
                onClick={(e) => {
                    e.stopPropagation();
                    toggleConfirming();
                }}
                className={cs.Delete__keep}
                type="button"
                value="KEEP"
            />
        </>
    );
}

export default DeleteButton;
