import { useAuth } from "./useAuth";

/*  the URLs we use (e.g. in Axios/fetch calls) will all be relative, 
    but new URL() wants an actual URL, so temporarily prepend the URL with 
    baseUrl to trick new URL() into thinking it's dealing with a proper URL. 
    In the end, we can just splice off baseUrl by only returning url.pathname + url.search 
*/
const baseUrl = "http://localhost"  

/**
 * Take a url string and append username query param with current user's username as value.
 */
export function useAuthUrl(url: string) {
	const { username } = useAuth().currentUser;
	
    if (!username) return url;

	const newUrl = new URL(url, baseUrl);
	newUrl.searchParams.set("username", username);
	return newUrl.pathname + newUrl.search;
}
