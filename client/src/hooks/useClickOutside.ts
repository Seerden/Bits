import { useEffect } from "react";

/**
 * Hook that handles clicking outside an element.
 * @param ref result of react.useRef(). Make sure the ref is
 *  attached to the desired element before passing it to this function.
 * @param handleClickOutside function to execute if a click outside
 *  of the given element is detected
 * @param keys in addition to clicking outside the element,
 *  we can also pass keys that, when pressed, trigger handleClickOutside
 */
export function useClickOutside(
    ref,
    handleClickOutside: (e?: any) => any,
    keys: string[] = ["Enter", "Escape"]
) {
    // const keys = ['Enter', 'Escape'];
    function handleKeypress(e) {
        if (ref.current && keys.includes(e.code)) {
            handleClickOutside(ref.current);
        }
    }

    function handleClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (ref.current && !ref.current.contains(e.target)) {
            handleClickOutside(e);
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleClick);
        window.addEventListener("keydown", handleKeypress);

        if (!ref.current) {
            window.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleKeypress);
        }
        return function () {
            window.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleKeypress);
        };
    });
}
