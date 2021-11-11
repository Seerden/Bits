import { useEffect, useRef } from "react";

export function useClickOutside(ref, handleClickOutside: (e) => any) {
	useEffect(() => {
		window.addEventListener("click", handleClickOutside);

        if (!ref.current) {
			window.removeEventListener("click", handleClickOutside);
        }
		return function () {
			window.removeEventListener("click", handleClickOutside);
		};
	});
}
