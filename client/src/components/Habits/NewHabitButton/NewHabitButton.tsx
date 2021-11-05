import './NewHabitButton.scss';

const NewHabitButton = ({ onClick }) => {
    const base = "NewHabitButton";
    
    return (
        <button 
            className={`${base}`}
            onClick={onClick}
        >
            Create new habit
        </button>
    )
}

export default NewHabitButton