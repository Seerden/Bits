import CompactHabit from "components/CompactHabit/CompactHabit";
import Timescale from "components/Timescale/Timescale";
import NewHabitButton from "./NewHabitButton/NewHabitButton";
import { useHabits } from "./useHabits";
import cs from "./Habits.module.scss";
import { memo, useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import HabitFilter from "./HabitFilter/HabitFilter";

const Habits = memo(() => {
    const { habitIds, timestep, cycleTimestep, labels, partitionsAsTimes, isFetching } =
        useHabits();
    const navigate = useNavigate();

    // derive <CompactHabit />[] from habits state
    const compactHabits = useMemo(
        () =>
            habitIds?.length > 0 &&
            habitIds.map((habitId) => (
                <CompactHabit
                    key={habitId}
                    habitId={habitId}
                    partitionsAsTimes={partitionsAsTimes}
                />
            )),
        [habitIds, timestep, partitionsAsTimes]
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

                        <ul>{compactHabits}</ul>
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
