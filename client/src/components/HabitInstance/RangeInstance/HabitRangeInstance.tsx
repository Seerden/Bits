import "./HabitRangeInstance.scss";
import { CompletionInstanceProps } from "types/CompletionInstance";
import { useHabitRangeInstance } from "./useHabitRangeInstance";

const HabitRangeInstance = (props: CompletionInstanceProps) => {
    const base = "HabitRangeInstance";

    const { progressString, sliderValue, handleInputChange, handleInputBlur } =
        useHabitRangeInstance(props);

    return (
        <div className={`${base}`}>
            <input
                className={`${base}__slider ${progressString}`}
                type="range"
                value={sliderValue}
                onChange={handleInputChange}
                onMouseUp={handleInputBlur}
                max={props.completionInterval}
            />
            <input
                className={`${base}__slider--input`}
                type="number"
                value={sliderValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
            />
        </div>
    );
};

export default HabitRangeInstance;
