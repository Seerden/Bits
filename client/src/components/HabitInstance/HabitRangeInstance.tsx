import './HabitRangeInstance.scss';
import { useState } from 'react';
import { CompletionInstanceProps } from 'types/CompletionInstance';

const HabitRangeInstance = ({ rangeValue, completionInterval }: CompletionInstanceProps) => {
    const base = "HabitRangeInstance";
    const [sliderValue, setSliderValue] = useState<number>(rangeValue);

    const progress = sliderValue >= completionInterval ? 'completed' : sliderValue >= completionInterval/2 ? 'underway' : 'incomplete'

    function handleInputChangeOrBlur(e) {
        const { value } = e.target;
        const newValue = value > 0 ? value : 0;

        setSliderValue(+newValue);
    }

    return (
        <div className={`${base}`}>
            <input 
                className={`${base}__slider ${progress}`}
                type="range" 
                value={sliderValue}    
                onChange={handleInputChangeOrBlur}
                onBlur={handleInputChangeOrBlur}
                max={completionInterval}
            />
            <input 
                className={`${base}__slider--input`}
                type="number" 
                value={sliderValue}
                onChange={handleInputChangeOrBlur}
                onBlur={handleInputChangeOrBlur}
            />
        </div>
    )
}

export default HabitRangeInstance