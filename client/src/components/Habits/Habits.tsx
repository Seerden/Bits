import CompactHabit from "components/CompactHabit/CompactHabit";
import Timescale from "components/Timescale/Timescale";
import NewHabitButton from "./NewHabitButton/NewHabitButton";
import { useHabits } from "./useHabits";
import cs from "./Habits.module.scss";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router";
import HabitFilter from "./HabitFilter/HabitFilter";
import { habitIdsForDisplaySelector } from "state/habits/habit-selectors";
import { useRecoilValue } from "recoil";

const Habits = memo(() => {
    const { habitIds, timestep, cycleTimestep, labels, partitionsAsTimes, isFetching } =
        useHabits();
    const navigate = useNavigate();
    const idsForDisplay = useRecoilValue(habitIdsForDisplaySelector);

    // derive <CompactHabit />[] from habits state
    const compactHabits = useMemo(
        () =>
            idsForDisplay?.length > 0 &&
            idsForDisplay.map((habitId) => (
                <CompactHabit
                    key={habitId}
                    habitId={habitId}
                    partitionsAsTimes={partitionsAsTimes}
                />
            )),
        [idsForDisplay, timestep, partitionsAsTimes]
    );

    return (
        <>
            <h1 className={cs.Title}>Habits</h1>
            <div className={cs.Habits}>
                {isFetching ? (
                    <>Fetching habits</>
                ) : habitIds.length > 0 ? (
                    <>
                        <header className={cs.Header}>
                            <HabitFilter />
                            <Timescale {...{ labels, cycleTimestep, timestep }} />
                        </header>

                        {compactHabits.length > 0 ? (
                            <ul>{compactHabits}</ul>
                        ) : (
                            <span className={cs.Message}>
                                All habits were filtered out
                            </span>
                        )}
                    </>
                ) : (
                    <>It appears you haven't started tracking any habits yet.</>
                )}

                <NewHabitButton onClick={() => navigate("new")} />
            </div>
        </>
    );
});

export default Habits;
