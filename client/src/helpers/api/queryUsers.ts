import axios from "axios";
import { useQuery } from "react-query";

async function fetchUsers() {
    const response = await axios.get("/api/db/users");
    return response.data;
}

export function useFetchUsers() {
    const response = useQuery("fetchUsers", fetchUsers, {
        enabled: false,
    });
    return response;
}
