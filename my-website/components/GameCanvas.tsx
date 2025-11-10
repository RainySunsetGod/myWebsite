"use client";

import { useEffect, useState, useMemo } from "react";
import { useGameStore } from "@/state/gameStore";
import { useKeyboard } from "@/hooks/useKeyboard";

export default function GameCanvas() {
    const { map, player, movePlayer, moveTo, stepAlongPath, path, initMap } = useGameStore();
    const [viewSize, setViewSize] = useState({ width: 15, height: 15 });
    const TILE_SIZE = 16;

    useKeyboard(movePlayer);

    // Responsive view
    useEffect(() => {
        const updateSize = () => {
            const width = Math.floor(window.innerWidth / TILE_SIZE / 1.5);
            const height = Math.floor(window.innerHeight / TILE_SIZE / 1.5);
            setViewSize({ width, height });
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Load map
    useEffect(() => {
        if (map.length === 0) initMap();
    }, [map.length, initMap]);

    // Step through path automatically
    useEffect(() => {
        if (path.length > 0) {
            const interval = setInterval(() => stepAlongPath(), 100);
            return () => clearInterval(interval);
        }
    }, [path, stepAlongPath]);

    const VIEW_WIDTH = viewSize.width;
    const VIEW_HEIGHT = viewSize.height;

    const mapCols = map[0]?.length ?? 0;
    const mapRows = map.length;

    const mapWidth = useMemo(() => mapCols * TILE_SIZE, [mapCols]);
    const mapHeight = useMemo(() => mapRows * TILE_SIZE, [mapRows]);

    const cameraX = useMemo(() => {
        if (mapCols === 0) return 0;
        const halfView = Math.floor(VIEW_WIDTH / 2);
        const centerX = player.x * TILE_SIZE - halfView * TILE_SIZE;
        const maxOffset = Math.max(0, mapWidth - VIEW_WIDTH * TILE_SIZE);
        return -Math.min(Math.max(centerX, 0), maxOffset);
    }, [mapCols, VIEW_WIDTH, player.x, mapWidth]);

    const cameraY = useMemo(() => {
        if (mapRows === 0) return 0;
        const halfView = Math.floor(VIEW_HEIGHT / 2);
        const centerY = player.y * TILE_SIZE - halfView * TILE_SIZE;
        const maxOffset = Math.max(0, mapHeight - VIEW_HEIGHT * TILE_SIZE);
        return -Math.min(Math.max(centerY, 0), maxOffset);
    }, [mapRows, VIEW_HEIGHT, player.y, mapHeight]);

    const isReady = mapRows > 0 && mapCols > 0;

    const handleClick = (x: number, y: number) => moveTo(x, y);

    return (
        <div
            className="relative overflow-hidden bg-gray-800 rounded-lg border border-gray-700"
            style={{
                width: `${VIEW_WIDTH * TILE_SIZE}px`,
                height: `${VIEW_HEIGHT * TILE_SIZE}px`,
            }}
        >
            {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Loading city...
                </div>
            )}

            {isReady && (
                <div
                    className="absolute transition-transform duration-100 ease-linear"
                    style={{
                        transform: `translate(${cameraX}px, ${cameraY}px)`,
                        width: `${mapWidth}px`,
                        height: `${mapHeight}px`,
                    }}
                >
                    {map.map((row, y) =>
                        row.map((tile, x) => {
                            const isPlayer = player.x === x && player.y === y;
                            const isInPath = path.some((p) => p.x === x && p.y === y);
                            return (
                                <div
                                    key={`${x}-${y}`}
                                    onClick={() => handleClick(x, y)}
                                    className={`absolute cursor-pointer ${isPlayer
                                            ? "bg-yellow-400"
                                            : isInPath
                                                ? "bg-blue-400"
                                                : tile.type === "road"
                                                    ? "bg-gray-600"
                                                    : tile.type === "park"
                                                        ? "bg-green-700"
                                                        : tile.type === "alley"
                                                            ? "bg-gray-700"
                                                            : "bg-gray-900"
                                        }`}
                                    style={{
                                        width: `${TILE_SIZE}px`,
                                        height: `${TILE_SIZE}px`,
                                        left: `${x * TILE_SIZE}px`,
                                        top: `${y * TILE_SIZE}px`,
                                    }}
                                />
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}
