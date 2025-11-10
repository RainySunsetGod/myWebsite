"use client";

import { useEffect, useState, useMemo } from "react";
import { useGameStore } from "@/state/gameStore";
import { useKeyboard } from "@/hooks/useKeyboard";

export default function GameCanvas() {
    const { map, player, movePlayer, initMap } = useGameStore();
    const [viewSize, setViewSize] = useState({ width: 15, height: 15 }); // default
    const TILE_SIZE = 16;

    useKeyboard(movePlayer);

    // run only in the browser
    useEffect(() => {
        const updateSize = () => {
            const width = Math.floor(window.innerWidth / TILE_SIZE / 1.5);
            const height = Math.floor(window.innerHeight / TILE_SIZE / 1.5);
            setViewSize({ width, height });
        };

        updateSize(); // set initial
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        if (map.length === 0) initMap();
    }, [map.length, initMap]);

    const VIEW_WIDTH = viewSize.width;
    const VIEW_HEIGHT = viewSize.height;


    const mapCols = map[0]?.length ?? 0;
    const mapRows = map.length;

    // Map pixel dimensions (safe when map is empty)
    const mapWidth = useMemo(() => mapCols * TILE_SIZE, [mapCols]);
    const mapHeight = useMemo(() => mapRows * TILE_SIZE, [mapRows]);

    // Camera follows the player, clamped to map bounds
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

    return (
        <div
            className="relative overflow-hidden bg-gray-800 rounded-lg border border-gray-700"
            style={{
                width: `${VIEW_WIDTH * TILE_SIZE}px`,
                height: `${VIEW_HEIGHT * TILE_SIZE}px`,
            }}
        >
            {/* Loading overlay (we still called all hooks above) */}
            {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Loading city...
                </div>
            )}

            {/* Map layer (only renders when ready) */}
            {isReady && (
                <div
                    className="absolute transition-transform duration-100 ease-linear"
                    style={{
                        transform: `translate(${cameraX}px, ${cameraY}px)`,
                        width: `${mapWidth}px`,
                        height: `${mapHeight}px`,
                    }}
                >
                    {/* Tiles */}
                    {map.map((row, y) =>
                        row.map((tile, x) => (
                            <div
                                key={`${x}-${y}`}
                                className={
                                    tile.type === "road"
                                        ? "absolute bg-gray-600"
                                        : tile.type === "park"
                                            ? "absolute bg-green-700"
                                            : tile.type === "alley"
                                                ? "absolute bg-gray-700"
                                                : "absolute bg-gray-900"
                                }
                                style={{
                                    width: `${TILE_SIZE}px`,
                                    height: `${TILE_SIZE}px`,
                                    left: `${x * TILE_SIZE}px`,
                                    top: `${y * TILE_SIZE}px`,
                                }}
                            />
                        ))
                    )}

                    {/* Player (world coordinates; camera centers it visually) */}
                    <div
                        className="absolute bg-yellow-400 rounded"
                        style={{
                            width: `${TILE_SIZE}px`,
                            height: `${TILE_SIZE}px`,
                            left: `${player.x * TILE_SIZE}px`,
                            top: `${player.y * TILE_SIZE}px`,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
