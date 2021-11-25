import axios from "axios";
import { useQuery } from "react-query";

async function fetchMe() {
    const response = await axios.get("/api/me");
    return response.data;
}

export function useFetchMe() {
    const response = useQuery("fetchUsers", fetchMe);
    return response;
}
