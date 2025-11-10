"use client";

import { useEffect } from "react";
import { useGameStore } from "@/state/gameStore";
import { useKeyboard } from "@/hooks/useKeyboard";

export default function GameCanvas() {
    const { map, player, movePlayer, initMap } = useGameStore();
    useKeyboard(movePlayer);

    useEffect(() => {
        if (map.length === 0) initMap();
    }, [map, initMap]);

    if (map.length === 0) return <p>Loading city...</p>;

    return (
        <div
            className="grid gap-0.5 bg-gray-800 p-2 rounded-lg"
            style={{
                gridTemplateColumns: `repeat(${map[0].length}, 1rem)`,
                gridTemplateRows: `repeat(${map.length}, 1rem)`,
            }}
        >
            {map.map((row, y) =>
                row.map((tile, x) => {
                    const isPlayer = player.x === x && player.y === y;
                    return (
                        <div
                            key={`${x}-${y}`}
                            className={`w-4 h-4 ${isPlayer
                                    ? "bg-yellow-400"
                                    : tile.type === "road"
                                        ? "bg-gray-600"
                                        : "bg-gray-900"
                                }`}
                        />
                    );
                })
            )}
        </div>
    );
}
