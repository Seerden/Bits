import './HabitRangeInstance.scss';
import { useState } from 'react';
import { CompletionInstanceProps } from 'types/CompletionInstance';

const HabitRangeInstance = (props: CompletionInstanceProps) => {
    const base = "HabitRangeInstance";
    
    const [sliderValue, setSliderValue] = useState<number>(props.rangeValue);

    function handleInputChangeOrBlur(e) {
        const { value } = e.target;
        const newValue = value > 0 ? value : 0;

        setSliderValue(+newValue);
    }

    return (
        <div className={`${base}`}>
            <input 
                className={`${base}__slider`}
                type="range" 
                value={sliderValue}    
                onChange={handleInputChangeOrBlur}
                onBlur={handleInputChangeOrBlur}
                max={props.completionInterval}
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