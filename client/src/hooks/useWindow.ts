import { useCallback, useEffect, useState } from "react";

type Size = {
    width: number;
    height: number;
};

export function useWindow() {
    const [size, setSize] = useState<Size>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = useCallback(() => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, [setSize]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return size;
}
