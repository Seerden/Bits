import { useEffect } from "react";

export function useClickOutside(ref, handleClickOutside: (e) => any) {
    const keys = ['Enter', 'Escape'];
    function handleKeypress(e) {
        if (ref.current && keys.includes(e.code)) {
            handleClickOutside(ref.current)
        }
    }

	useEffect(() => {
		window.addEventListener("click", handleClickOutside);
        window.addEventListener("keydown", handleKeypress);

		if (!ref.current) {
			window.removeEventListener("click", handleClickOutside);
            window.removeEventListener("keydown", handleKeypress);

		}
		return function () {
			window.removeEventListener("click", handleClickOutside);
            window.removeEventListener("keydown", handleKeypress);
		};
	});
}
