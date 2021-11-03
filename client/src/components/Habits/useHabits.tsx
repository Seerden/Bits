import { useFetchHabits } from "helpers/api/habitQuery";
import { useEffect } from "react";

export function useHabits() {
    const { data, setDateRange } = useFetchHabits();

    return data;
}