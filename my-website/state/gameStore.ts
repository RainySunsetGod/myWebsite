"use client";

import { create } from "zustand";
import { generateMap, Tile } from "@/features/map/generator";

interface Player {
    x: number;
    y: number;
}

interface GameState {
    map: Tile[][];
    player: Player;
    movePlayer: (dx: number, dy: number) => void;
    initMap: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    map: [], // start empty
    player: { x: 0, y: 0 },

    movePlayer: (dx, dy) => {
        const { player, map } = get();
        if (!map.length) return;

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

    initMap: () => {
        const map = generateMap(20, 20);
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
