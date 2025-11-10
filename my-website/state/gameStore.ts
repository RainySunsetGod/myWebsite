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
}

// 👇 Generate the map first
const map = generateMap(20, 20);

// 👇 Find the first road tile for a safe spawn
let spawn = { x: 0, y: 0 };
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x].type === "road") {
            spawn = { x, y };
            break;
        }
    }
}

// 👇 Create the Zustand store
export const useGameStore = create<GameState>((set, get) => ({
    map,
    player: spawn,
    movePlayer: (dx, dy) => {
        const { player, map } = get();
        const newX = player.x + dx;
        const newY = player.y + dy;

        // 👇 Only move onto road tiles
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
}));
