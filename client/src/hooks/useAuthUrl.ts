import { useAuth } from "./useAuth";

// actual URLS will all be relative, but new URL() wants an actual URL, 
// so temporarily prepend URL with this, and return url.pathname+url.search
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
