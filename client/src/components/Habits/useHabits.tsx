import { useFetchHabits } from "helpers/api/habitQuery";

export function useHabits() {
    const { data, setDateRange } = useFetchHabits();

    return data;
}