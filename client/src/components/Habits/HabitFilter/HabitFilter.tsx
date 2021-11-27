import { useState } from "react";
import cs from "./HabitFilter.module.scss";
import { HiCheck } from "react-icons/hi";
import { useToggle } from "hooks/useToggle";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { BsFilterRight } from "react-icons/bs";

enum Options {
    ALL = "all",
    COMPLETE = "finished",
    INCOMPLETE = "incomplete",
}

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
            <SelectedBox selected={selected} />
        </li>
    );
}

function SelectedBox({ selected }) {
    return (
        <span className={cs.Box}>
            {selected ? <HiCheck fill="green" width="1em" height="1em" /> : <span></span>}
        </span>
    );
}

const HabitFilter = () => {
    const [value, setValue] = useState<string>(Options.ALL);
    const [expanded, toggleExpanded] = useToggle({ initial: false });

    return (
        <ul className={cs.Filter}>
            <button onClick={toggleExpanded} className={cs.Filter__header}>
                {!expanded ? (
                    <>
                        Filter habits <BsFilterRight />
                    </>
                ) : (
                    <>
                        Show <RiArrowDropUpLine />
                    </>
                )}
            </button>
            {expanded && (
                <div className={cs.Options}>
                    {Object.values(Options).map((option, index) => (
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
