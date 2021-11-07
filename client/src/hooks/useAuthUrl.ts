import { useAuth } from "./useAuth";

export function useAuthUrl(url: string) {
	const { username } = useAuth().currentUser;
	const urlWithUserQueryParam = username ? url + `?user=${username}` : url;
	return urlWithUserQueryParam;
}
