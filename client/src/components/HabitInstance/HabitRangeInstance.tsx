import './HabitRangeInstance.scss';
import { useState } from 'react';

type HabitRange = {
    value?: number,
    intervalMax: number,
}

const HabitRangeInstance = ({ value = 0, intervalMax }: HabitRange) => {
    const base = "HabitRangeInstance";
    
    const [sliderValue, setSliderValue] = useState<number>(value);

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
                max={intervalMax}
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