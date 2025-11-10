"use client";

import { useEffect } from "react";

export function useKeyboard(movePlayer: (dx: number, dy: number) => void) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            // 👇 Add this line to verify keys are registering
            console.log("Pressed:", e.key);

            switch (e.key.toLowerCase()) {
                case "arrowup":
                case "w":
                    movePlayer(0, -1);
                    break;
                case "arrowdown":
                case "s":
                    movePlayer(0, 1);
                    break;
                case "arrowleft":
                case "a":
                    movePlayer(-1, 0);
                    break;
                case "arrowright":
                case "d":
                    movePlayer(1, 0);
                    break;
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [movePlayer]);
}
