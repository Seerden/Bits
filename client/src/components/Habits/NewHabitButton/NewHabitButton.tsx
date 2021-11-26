import cs from "./NewHabitButton.module.scss";
import { AiOutlinePlus } from "react-icons/ai";

const NewHabitButton = ({ onClick }) => {
    const base = "NewHabitButton";

    return (
        <button title="Create new habit" className={cs.Button} onClick={onClick}>
            <AiOutlinePlus className={cs.Plus} />
        </button>
    );
};

export default NewHabitButton;
