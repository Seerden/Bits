import cs from "./HabitFilter.module.scss";
import { HiCheck } from "react-icons/hi";
import { useToggle } from "hooks/useToggle";
import { RiArrowDropUpLine } from "react-icons/ri";
import { BsFilterRight } from "react-icons/bs";
import { HabitFilterOptions, habitFilterValueAtom } from "state/habits/habit-selectors";
import { useRecoilState } from "recoil";

function Option({ text, selected, onClick }) {
    return (
        <li
            onClick={onClick}
            className={cs.Option}
            style={{
                borderLeft: selected ? "4px solid limegreen" : "4px solid transparent",
            }}
        >
            <span>{text}</span>
            <CheckmarkOrBox selected={selected} />
        </li>
    );
}

function CheckmarkOrBox({ selected }) {
    return (
        <span className={cs.Box}>
            {selected ? <HiCheck fill="green" width="1em" height="1em" /> : <span></span>}
        </span>
    );
}

const HabitFilter = () => {
    const [expanded, toggleExpanded] = useToggle({ initial: false });
    const [value, setValue] = useRecoilState(habitFilterValueAtom);

    return (
        <ul className={cs.Filter}>
            <button onClick={toggleExpanded} className={cs.Filter__header}>
                <span>
                    Showing <em>{value}</em>{" "}
                </span>
                {!expanded ? <BsFilterRight /> : <RiArrowDropUpLine />}
            </button>
            {expanded && (
                <div className={cs.Options}>
                    {Object.values(HabitFilterOptions).map((option, index) => (
                        <Option
                            key={index}
                            text={option}
                            onClick={() => {
                                setValue(option);
                                toggleExpanded();
                            }}
                            selected={option === value}
                        />
                    ))}
                </div>
            )}
        </ul>
    );
};

export default HabitFilter;
