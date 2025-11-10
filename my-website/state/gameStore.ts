"use client";

import { create } from "zustand";
import { generateMap, Tile } from "@/features/map/generator";
import { findPath } from "@/features/pathfinding/aStar";

interface Player {
    x: number;
    y: number;
}

interface GameState {
    map: Tile[][];
    player: Player;
    path: { x: number; y: number }[];
    movePlayer: (dx: number, dy: number) => void;
    initMap: () => void;
    moveTo: (x: number, y: number) => void;
    stepAlongPath: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    map: [],
    player: { x: 0, y: 0 },
    path: [],

    movePlayer: (dx, dy) => {
        const { player, map } = get();
        const newX = player.x + dx;
        const newY = player.y + dy;
        if (
            newY >= 0 &&
            newY < map.length &&
            newX >= 0 &&
            newX < map[0].length &&
            map[newY][newX].type === "road"
        ) {
            set({ player: { x: newX, y: newY } });
        }
    },

    moveTo: (x, y) => {
        const { map, player } = get();
        const path = findPath(map, player, { x, y });
        set({ path });
    },

    stepAlongPath: () => {
        const { path } = get();
        if (path.length > 1) {
            const [, next, ...rest] = path;
            set({ player: next, path: [next, ...rest] });
        } else {
            set({ path: [] }); // done
        }
    },

    initMap: () => {
        const map = generateMap(100, 100);
        let spawn = { x: 0, y: 0 };
        outer: for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x].type === "road") {
                    spawn = { x, y };
                    break outer;
                }
            }
        }
        set({ map, player: spawn });
    },
}));
