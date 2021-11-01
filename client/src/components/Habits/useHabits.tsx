import { useFetchHabits } from "helpers/api/habitQuery";
import { useEffect } from "react";

export function useHabits() {
    const { data, setDateRange } = useFetchHabits();

    useEffect(() => {
        data && console.log(data);
    }, [data])

    return data;

}