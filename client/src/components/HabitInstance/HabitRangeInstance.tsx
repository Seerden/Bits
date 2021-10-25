import './HabitRangeInstance.scss';
import { useCallback, useState } from 'react';

type HabitRange = {
    value?: number,
    intervalMax: number,
}

const HabitRangeInstance = ({ value = 0, intervalMax }: HabitRange) => {
    const base = "HabitRangeInstance";
    
    const [sliderValue, setSliderValue] = useState<number>(value);

    const handleSliderChange = useCallback((e, newValue) => {
        if (newValue !== sliderValue) {
            setSliderValue(newValue);
        }
    }, [sliderValue]);

    function handleInputChangeOrBlur(e) {
        const { value } = e.target;
        const newValue = value > 0 ? value : 0;

        setSliderValue(+newValue);
    }

    return (
        <div className={`${base}`}>
            <input 
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