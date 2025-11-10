"use client";

import { useGameStore } from "@/state/gameStore";
import { useKeyboard } from "@/hooks/useKeyboard";

export default function GameCanvas() {
    const { map, player, movePlayer } = useGameStore();
    useKeyboard(movePlayer);

    const tileSize = 16; // keep this consistent with w-4/h-4

    return (
        <div
            className="relative bg-gray-800 p-2 rounded-lg"
            style={{
                width: `${map[0].length * (tileSize + 2)}px`,
                height: `${map.length * (tileSize + 2)}px`,
            }}
        >
            {/* Tiles */}
            <div
                className="grid gap-0.5 absolute top-2 left-2"
                style={{
                    gridTemplateColumns: `repeat(${map[0].length}, ${tileSize}px)`,
                    gridTemplateRows: `repeat(${map.length}, ${tileSize}px)`,
                }}
            >
                {map.map((row, y) =>
                    row.map((tile, x) => (
                        <div
                            key={`${x}-${y}`}
                            className={`w-[${tileSize}px] h-[${tileSize}px] ${tile.type === "road" ? "bg-gray-600" : "bg-gray-900"
                                }`}
                        />
                    ))
                )}
            </div>

            {/* Player */}
            <div
                className="absolute bg-yellow-400 rounded transition-transform duration-100 ease-in-out"
                style={{
                    width: `${tileSize}px`,
                    height: `${tileSize}px`,
                    transform: `translate(${player.x * (tileSize + 2)}px, ${player.y * (tileSize + 2)
                        }px)`,
                }}
            />
        </div>
    );
}
